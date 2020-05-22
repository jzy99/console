import * as React from 'react';
import {
  Alert,
  AlertVariant,
  Form,
  FormSelect,
  FormSelectOption,
  TextInput,
  Expandable,
} from '@patternfly/react-core';
import {
  FirehoseResult,
  HandlePromiseProps,
  withHandlePromise,
} from '@console/internal/components/utils';
import { ModalBody, ModalComponentProps, ModalTitle } from '@console/internal/components/factory';
import {
  NamespaceModel,
  PersistentVolumeClaimModel,
  StorageClassModel,
} from '@console/internal/models';
import { getName } from '@console/shared/src';
import { getLoadedData, isLoaded, prefixedID } from '../../../utils';
import { validateDisk } from '../../../utils/validations/vm';
import { isValidationError } from '../../../utils/validations/common';
import { FormRow } from '../../form/form-row';
import {
  asFormSelectValue,
  FormSelectPlaceholderOption,
} from '../../form/form-select-placeholder-option';
import {
  getDefaultSCAccessModes,
  getDefaultSCVolumeMode,
} from '../../../selectors/config-map/sc-defaults';
import {
  ADD,
  DYNAMIC,
  EDIT,
  getDialogUIError,
  getSequenceName,
  SAVE,
} from '../../../utils/strings';
import { ModalFooter } from '../modal/modal-footer';
import { useShowErrorToggler } from '../../../hooks/use-show-error-toggler';
import { DiskWrapper } from '../../../k8s/wrapper/vm/disk-wrapper';
import { DataVolumeWrapper } from '../../../k8s/wrapper/vm/data-volume-wrapper';
import { VolumeWrapper } from '../../../k8s/wrapper/vm/volume-wrapper';
import { AccessMode, DiskBus, DiskType, VolumeMode } from '../../../constants/vm/storage';
import { getPvcStorageSize } from '../../../selectors/pvc/selectors';
import { K8sResourceSelectRow } from '../../form/k8s-resource-select-row';
import { SizeUnitFormRow } from '../../form/size-unit-form-row';
import { CombinedDisk } from '../../../k8s/wrapper/vm/combined-disk';
import { PersistentVolumeClaimWrapper } from '../../../k8s/wrapper/vm/persistent-volume-claim-wrapper';
import { BinaryUnit, stringValueUnitSplit } from '../../form/size-unit-utils';
import { StorageUISource } from './storage-ui-source';
import { TemplateValidations } from '../../../utils/validations/template/template-validations';
import { ConfigMapKind } from '@console/internal/module/k8s';
import { UIStorageEditConfig } from '../../../types/ui/storage';
import { isFieldDisabled } from '../../../utils/ui/edit-config';

import './disk-modal.scss';

export const DiskModal = withHandlePromise((props: DiskModalProps) => {
  const {
    showInitialValidation,
    storageClasses,
    usedPVCNames,
    persistentVolumeClaims,
    vmName,
    vmNamespace,
    namespace,
    namespaces,
    onNamespaceChanged,
    usedDiskNames,
    isCreateTemplate,
    onSubmit,
    inProgress: _inProgress,
    isEditing,
    errorMessage,
    handlePromise,
    close,
    cancel,
    templateValidations,
    storageClassConfigMap: _storageClassConfigMap,
    editConfig,
  } = props;
  const inProgress = _inProgress || !isLoaded(_storageClassConfigMap);
  const isDisabled = (fieldName: string, disabled?: boolean) =>
    inProgress || disabled || isFieldDisabled(editConfig, fieldName);

  const storageClassConfigMap = getLoadedData(_storageClassConfigMap);

  const asId = prefixedID.bind(null, 'disk');
  const disk = props.disk || new DiskWrapper();
  const volume = props.volume || new VolumeWrapper();
  const dataVolume = props.dataVolume || new DataVolumeWrapper();
  const tValidations = templateValidations || new TemplateValidations();

  const validAllowedBuses = tValidations.getAllowedBuses(disk.getType());
  const recommendedBuses = tValidations.getRecommendedBuses(disk.getType());

  const combinedDisk = new CombinedDisk({
    diskWrapper: disk,
    volumeWrapper: volume,
    dataVolumeWrapper: dataVolume,
    persistentVolumeClaimWrapper: props.persistentVolumeClaim,
    isNewPVC: !!props.persistentVolumeClaim,
  });
  const combinedDiskSize = combinedDisk.getSize();

  const type = disk.getType() || DiskType.DISK;

  const [source, setSource] = React.useState<StorageUISource>(
    combinedDisk.getInitialSource(isEditing),
  );

  const [url, setURL] = React.useState<string>(dataVolume.getURL());

  const [containerImage, setContainerImage] = React.useState<string>(
    volume.getContainerImage() || '',
  );

  const [pvcName, setPVCName] = React.useState<string>(combinedDisk.getPVCName(source));

  const [name, setName] = React.useState<string>(
    disk.getName() || getSequenceName('disk', usedDiskNames),
  );
  const [bus, setBus] = React.useState<DiskBus>(
    disk.getDiskBus() ||
      (isEditing
        ? null
        : validAllowedBuses.has(DiskBus.VIRTIO)
        ? DiskBus.VIRTIO
        : [...validAllowedBuses][0]),
  );
  const [storageClassName, setStorageClassName] = React.useState<string>(
    combinedDisk.getStorageClassName() || '',
  );

  const [size, setSize] = React.useState<string>(
    combinedDiskSize ? `${combinedDiskSize.value}` : '',
  );
  const [unit, setUnit] = React.useState<string>(
    (combinedDiskSize && combinedDiskSize.unit) || BinaryUnit.Gi,
  );

  const [advancedDrawerIsOpen, setAdvancedDrawerIsOpen] = React.useState(false);

  const [accessMode, setAccessMode] = React.useState<AccessMode>(
    (isEditing && (combinedDisk.getAccessModes() || [])[0]) || null,
  );

  const [volumeMode, setVolumeMode] = React.useState<VolumeMode>(
    (isEditing && combinedDisk.getVolumeMode()) || null,
  );

  React.useEffect(() => {
    if (!isEditing && isLoaded(_storageClassConfigMap)) {
      if (source.requiresVolumeMode()) {
        setVolumeMode(getDefaultSCVolumeMode(storageClassConfigMap));
      }
      if (source.requiresAccessModes()) {
        setAccessMode(getDefaultSCAccessModes(storageClassConfigMap)[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded(_storageClassConfigMap)]);

  const resultDisk = DiskWrapper.initializeFromSimpleData({
    name,
    bus,
    type,
  });

  const resultDataVolumeName = prefixedID(vmName, name);

  const resultVolume = VolumeWrapper.initializeFromSimpleData({
    name,
    type: source.getVolumeType(),
    typeData: {
      name: resultDataVolumeName,
      claimName: pvcName,
      image: containerImage,
    },
  });

  let resultDataVolume;
  if (source.requiresDatavolume()) {
    resultDataVolume = DataVolumeWrapper.initializeFromSimpleData({
      name: resultDataVolumeName,
      storageClassName: storageClassName || null, // || null is to enable merging
      type: source.getDataVolumeSourceType(),
      size,
      unit,
      typeData: { name: pvcName, namespace, url },
    })
      .setVolumeMode(volumeMode || null)
      .setAccessModes(accessMode ? [accessMode] : null);
  }

  let resultPersistentVolumeClaim;
  if (source.requiresNewPVC()) {
    resultPersistentVolumeClaim = new PersistentVolumeClaimWrapper()
      .init({
        name,
        storageClassName: storageClassName || null, // || null is to enable merging
        size,
        unit,
      })
      .setVolumeMode(volumeMode || null)
      .setAccessModes(accessMode ? [accessMode] : null);
  }

  const {
    validations: {
      name: nameValidation,
      size: sizeValidation,
      container: containerValidation,
      pvc: pvcValidation,
      diskInterface: busValidation,
      url: urlValidation,
    },
    isValid,
    hasAllRequiredFilled,
  } = validateDisk(resultDisk, resultVolume, resultDataVolume, resultPersistentVolumeClaim, {
    usedDiskNames,
    usedPVCNames,
    templateValidations,
  });

  const [showUIError, setShowUIError] = useShowErrorToggler(
    !!showInitialValidation,
    isValid,
    isValid,
  );

  const submit = (e) => {
    e.preventDefault();

    if (isValid) {
      // eslint-disable-next-line promise/catch-or-return
      handlePromise(
        onSubmit(resultDisk, resultVolume, resultDataVolume, resultPersistentVolumeClaim),
      ).then(close);
    } else {
      setShowUIError(true);
    }
  };

  const onNameChanged = React.useCallback(
    (v) => {
      if (source.requiresNewPVC()) {
        setPVCName(v);
      }
      setName(v);
    },
    [setName, setPVCName, source],
  );

  const onStorageClassNameChanged = (newStorageClassName) => {
    // eslint-disable-next-line eqeqeq
    if (newStorageClassName != storageClassName) {
      setStorageClassName(newStorageClassName);
      const newAccessMode = getDefaultSCAccessModes(storageClassConfigMap, newStorageClassName)[0];
      const newVolumeMode = getDefaultSCVolumeMode(storageClassConfigMap, newStorageClassName);
      if (newAccessMode !== accessMode) {
        setAccessMode(newAccessMode);
      }
      if (newVolumeMode !== volumeMode) {
        setVolumeMode(newVolumeMode);
      }
      if (newAccessMode !== accessMode || newVolumeMode !== volumeMode) {
        setAdvancedDrawerIsOpen(true); // notify the user that the hidden values were changed by force
      }
    }
  };

  const onSourceChanged = (uiSource) => {
    setSize('');
    setUnit('Gi');
    setURL('');
    setPVCName('');
    setContainerImage('');
    onStorageClassNameChanged('');
    onNamespaceChanged(vmNamespace);
    setSource(StorageUISource.fromString(uiSource));
  };

  const onPVCChanged = (newPVCName) => {
    setPVCName(newPVCName);
    if (source === StorageUISource.ATTACH_CLONED_DISK) {
      const newSizeBundle = getPvcStorageSize(
        getLoadedData(persistentVolumeClaims).find((p) => getName(p) === newPVCName),
      );
      const [newSize, newUnit] = stringValueUnitSplit(newSizeBundle);
      setSize(newSize);
      setUnit(newUnit);
    }
  };

  const onToggleAdvancedDrawer = () => {
    setAdvancedDrawerIsOpen(!advancedDrawerIsOpen);
  };

  return (
    <div className="modal-content">
      <ModalTitle>
        {isEditing ? EDIT : ADD} {type.toString()}
      </ModalTitle>
      <ModalBody>
        <Form>
          <FormRow title="Source" fieldId={asId('source')} isRequired>
            <FormSelect
              onChange={onSourceChanged}
              value={asFormSelectValue(source)}
              id={asId('source')}
              isDisabled={isDisabled('source', !source.canBeChangedToThisSource(type))}
            >
              {StorageUISource.getAll()
                .filter(
                  (storageUISource) =>
                    storageUISource.canBeChangedToThisSource(type) ||
                    !source.canBeChangedToThisSource(type),
                )
                .map((uiType) => {
                  return (
                    <FormSelectOption
                      key={uiType.getValue()}
                      value={uiType.getValue()}
                      label={uiType.toString()}
                    />
                  );
                })}
            </FormSelect>
          </FormRow>
          {source.requiresURL() && (
            <FormRow title="URL" fieldId={asId('url')} isRequired validation={urlValidation}>
              <TextInput
                isValid={!isValidationError(urlValidation)}
                key="url"
                isDisabled={isDisabled('url')}
                isRequired
                id={asId('url')}
                value={url}
                onChange={(v) => setURL(v)}
              />
            </FormRow>
          )}
          {source.requiresContainerImage() && (
            <FormRow
              title="Container"
              fieldId={asId('container')}
              isRequired
              validation={containerValidation}
            >
              <TextInput
                isValid={!isValidationError(containerValidation)}
                key="container"
                isDisabled={isDisabled('container')}
                isRequired
                id={asId('container')}
                value={containerImage}
                onChange={(v) => setContainerImage(v)}
              />
            </FormRow>
          )}
          {source.requiresNamespace() && (
            <K8sResourceSelectRow
              key="pvc-namespace"
              id={asId('pvc-namespace')}
              isDisabled={isDisabled('pvcNamespace')}
              name={namespace}
              data={namespaces}
              model={NamespaceModel}
              title={`PVC ${NamespaceModel.label}`}
              onChange={(ns) => {
                setPVCName('');
                onNamespaceChanged(ns);
              }}
            />
          )}
          {source.requiresPVC() && (
            <K8sResourceSelectRow
              key="pvc-select"
              id={asId('pvc')}
              isDisabled={isDisabled('pvc', !namespace)}
              isRequired
              name={pvcName}
              validation={pvcValidation}
              data={persistentVolumeClaims}
              model={PersistentVolumeClaimModel}
              hasPlaceholder
              isPlaceholderDisabled
              onChange={onPVCChanged}
              filter={(p) => !(usedPVCNames && usedPVCNames.has(getName(p)))}
            />
          )}
          <FormRow
            title="Name"
            fieldId={asId('name')}
            isRequired
            isLoading={!usedDiskNames}
            validation={nameValidation}
          >
            <TextInput
              isValid={!isValidationError(nameValidation)}
              isDisabled={isDisabled(
                'name',
                !usedDiskNames || !source.isNameEditingSupported(type),
              )}
              isRequired
              id={asId('name')}
              value={name}
              onChange={onNameChanged}
            />
          </FormRow>

          {source.requiresSize() && (
            <SizeUnitFormRow
              key="size-row"
              id={asId('size-row')}
              size={size}
              unit={unit as BinaryUnit}
              units={source.getAllowedUnits()}
              validation={sizeValidation}
              isDisabled={isDisabled(
                'size',
                !source.isSizeEditingSupported(combinedDiskSize?.value),
              )}
              isRequired
              onSizeChanged={
                source.isSizeEditingSupported(combinedDiskSize?.value) ? setSize : undefined
              }
              onUnitChanged={
                source.isSizeEditingSupported(combinedDiskSize?.value) ? setUnit : undefined
              }
            />
          )}
          {!source.requiresSize() && source.hasDynamicSize() && (
            <FormRow title="Size" fieldId={asId('dynamic-size-row')}>
              <TextInput
                key="dynamic-size-row"
                isDisabled
                id={asId('dynamic-size-row')}
                value={DYNAMIC}
              />
            </FormRow>
          )}
          <FormRow
            title="Interface"
            fieldId={asId('interface')}
            isRequired
            validation={busValidation}
          >
            <FormSelect
              onChange={React.useCallback((diskBus) => setBus(DiskBus.fromString(diskBus)), [
                setBus,
              ])}
              isValid={!isValidationError(busValidation)}
              value={asFormSelectValue(bus)}
              id={asId('interface')}
              isDisabled={isDisabled('interface')}
            >
              <FormSelectPlaceholderOption isDisabled placeholder="--- Select Interface ---" />
              {!validAllowedBuses.has(bus) && (
                <FormSelectOption
                  isDisabled
                  key={bus.getValue()}
                  value={bus.getValue()}
                  label={bus.toString()}
                />
              )}
              {[...validAllowedBuses].map((b) => (
                <FormSelectOption
                  key={b.getValue()}
                  value={b.getValue()}
                  label={`${b.toString()}${
                    recommendedBuses.size !== validAllowedBuses.size && recommendedBuses.has(b)
                      ? ' --- Recommended ---'
                      : ''
                  }`}
                />
              ))}
            </FormSelect>
          </FormRow>
          {source.requiresStorageClass() && (
            <K8sResourceSelectRow
              key="storage-class"
              id={asId('storage-class')}
              isDisabled={isDisabled('storageClass')}
              name={storageClassName}
              data={storageClasses}
              model={StorageClassModel}
              hasPlaceholder
              onChange={(sc) => onStorageClassNameChanged(sc || '')}
            />
          )}
          {source.isPlainDataVolume(isCreateTemplate) && (
            <Alert
              variant={AlertVariant.warning}
              isInline
              title="PVC will be created on template creation and used by VMs created from this template."
            />
          )}
          {source.requiresVolumeModeOrAccessModes() && (
            <Expandable
              toggleText="Advanced"
              isExpanded={advancedDrawerIsOpen}
              onToggle={onToggleAdvancedDrawer}
              className="disk-advanced-drawer"
            >
              {source.requiresVolumeMode() && (
                <FormRow title="Volume Mode" fieldId={asId('volume-mode')}>
                  <FormSelect
                    onChange={(vMode) => setVolumeMode(VolumeMode.fromString(vMode))}
                    value={asFormSelectValue(volumeMode?.getValue())}
                    id={asId('volume-mode')}
                    isDisabled={isDisabled('volumeMode')}
                  >
                    <FormSelectPlaceholderOption
                      isDisabled={inProgress}
                      placeholder="--- Select Volume Mode ---"
                    />
                    {VolumeMode.getAll().map((v) => (
                      <FormSelectOption
                        key={v.getValue()}
                        value={v.getValue()}
                        label={`${v.toString()}`}
                      />
                    ))}
                  </FormSelect>
                </FormRow>
              )}
              {source.requiresAccessModes() && (
                <FormRow
                  title="Access Mode"
                  fieldId={asId('access-mode')}
                  className="disk-access-mode"
                >
                  <FormSelect
                    onChange={(aMode) => setAccessMode(AccessMode.fromString(aMode))}
                    value={asFormSelectValue(accessMode?.getValue())}
                    id={asId('access-mode')}
                    isDisabled={isDisabled('accessMode')}
                  >
                    <FormSelectPlaceholderOption
                      isDisabled={inProgress}
                      placeholder="--- Select Access Mode ---"
                    />
                    {AccessMode.getAll().map((a) => (
                      <FormSelectOption
                        key={a.getValue()}
                        value={a.getValue()}
                        label={a.toString()}
                      />
                    ))}
                  </FormSelect>
                </FormRow>
              )}
            </Expandable>
          )}
        </Form>
      </ModalBody>
      <ModalFooter
        id="disk"
        submitButtonText={isEditing ? SAVE : ADD}
        errorMessage={errorMessage || (showUIError ? getDialogUIError(hasAllRequiredFilled) : null)}
        isDisabled={inProgress}
        inProgress={inProgress}
        isSimpleError={showUIError}
        onSubmit={submit}
        onCancel={(e) => {
          e.stopPropagation();
          cancel();
        }}
      />
    </div>
  );
});

export type DiskModalProps = {
  disk?: DiskWrapper;
  showInitialValidation?: boolean;
  isCreateTemplate?: boolean;
  isEditing?: boolean;
  volume?: VolumeWrapper;
  dataVolume?: DataVolumeWrapper;
  persistentVolumeClaim?: PersistentVolumeClaimWrapper;
  storageClassConfigMap?: FirehoseResult<ConfigMapKind>;
  onSubmit: (
    disk: DiskWrapper,
    volume: VolumeWrapper,
    dataVolume: DataVolumeWrapper,
    persistentVolumeClaim: PersistentVolumeClaimWrapper,
  ) => Promise<any>;
  namespaces?: FirehoseResult;
  storageClasses?: FirehoseResult;
  persistentVolumeClaims?: FirehoseResult;
  vmName: string;
  vmNamespace: string;
  namespace: string;
  onNamespaceChanged: (namespace: string) => void;
  templateValidations?: TemplateValidations;
  usedDiskNames: Set<string>;
  usedPVCNames: Set<string>;
  editConfig?: UIStorageEditConfig;
} & ModalComponentProps &
  HandlePromiseProps;
