import * as _ from 'lodash';
import { K8sResourceKind, K8sKind, referenceForModel } from '@console/internal/module/k8s';
import { checkAccess } from '@console/internal/components/utils';
import { getAppLabels } from '@console/dev-console/src/utils/resource-label-utils';
import { annotations } from '@console/dev-console/src/utils/shared-submit-utils';
import { EventSources, EventSourceFormData } from '../components/add/import-types';
import { ServiceModel } from '../models';
import { getKnativeEventSourceIcon } from './get-knative-icon';
import { NormalizedEventSources } from '../components/add/import-types';

export const getEventSourcesDepResource = (formData: EventSourceFormData): K8sResourceKind => {
  const {
    type,
    name,
    apiVersion,
    application: { name: applicationName },
    project: { name: namespace },
    data,
    sink: { knativeService },
  } = formData;

  const defaultLabel = getAppLabels(name, applicationName);
  const eventSrcData = data[type.toLowerCase()];
  const eventSourceResource: K8sResourceKind = {
    kind: type,
    apiVersion,
    metadata: {
      name,
      namespace,
      labels: {
        ...defaultLabel,
      },
      annotations,
    },
    spec: {
      sink: {
        ref: {
          apiVersion: `${ServiceModel.apiGroup}/${ServiceModel.apiVersion}`,
          kind: ServiceModel.kind,
          name: knativeService,
        },
      },
      ...(eventSrcData && eventSrcData),
    },
  };

  return eventSourceResource;
};

export const getKafkaSourceResource = (formData: EventSourceFormData): K8sResourceKind => {
  const {
    limits: { cpu, memory },
  } = formData;
  const baseResource = getEventSourcesDepResource(formData);
  const kafkaSource = {
    spec: {
      resources: {
        ...((cpu.limit || memory.limit) && {
          limits: {
            ...(cpu.limit && { cpu: `${cpu.limit}${cpu.limitUnit}` }),
            ...(memory.limit && { memory: `${memory.limit}${memory.limitUnit}` }),
          },
        }),
        ...((cpu.request || memory.request) && {
          requests: {
            ...(cpu.request && { cpu: `${cpu.request}${cpu.requestUnit}` }),
            ...(memory.request && { memory: `${memory.request}${memory.requestUnit}` }),
          },
        }),
      },
    },
  };
  return _.merge({}, baseResource, kafkaSource);
};

export const getEventSourceResource = (formData: EventSourceFormData): K8sResourceKind => {
  switch (formData.type) {
    case EventSources.KafkaSource:
      return getKafkaSourceResource(formData);
    default:
      return getEventSourcesDepResource(formData);
  }
};

export const getEventSourceData = (source: string) => {
  const eventSourceData = {
    cronjobsource: {
      data: '',
      schedule: '',
    },
    sinkbinding: {
      subject: {
        apiVersion: '',
        kind: '',
        selector: {
          matchLabels: {},
        },
      },
    },
    apiserversource: {
      mode: 'Ref',
      serviceAccountName: '',
      resources: [
        {
          apiVersion: '',
          kind: '',
        },
      ],
    },
    kafkasource: {
      bootstrapServers: '',
      topics: '',
      consumerGroup: '',
      net: {
        sasl: {
          enable: false,
          user: { secretKeyRef: { name: '', key: '' } },
          password: { secretKeyRef: { name: '', key: '' } },
        },
        tls: {
          enable: false,
          caCert: { secretKeyRef: { name: '', key: '' } },
          cert: { secretKeyRef: { name: '', key: '' } },
          key: { secretKeyRef: { name: '', key: '' } },
        },
      },
      serviceAccountName: '',
    },
  };
  return eventSourceData[source];
};

export const getKnativeEventingAccess = async (model: K8sKind, namespace: string) => {
  const canCreateEventSource = await checkAccess({
    group: model.apiGroup,
    resource: model.plural,
    namespace,
    verb: 'create',
  });
  return canCreateEventSource?.status?.allowed;
};

export const getEventSourceList = (
  eventSourceModelList: K8sKind[],
  namespace: string,
): NormalizedEventSources => {
  const eventSourceList = _.reduce(
    eventSourceModelList,
    (accumulator, eventSourceModel) => {
      return {
        ...accumulator,
        ...(getKnativeEventingAccess(eventSourceModel, namespace) && {
          [eventSourceModel.kind]: {
            name: eventSourceModel.kind,
            iconUrl: getKnativeEventSourceIcon(referenceForModel(eventSourceModel)),
            displayName: eventSourceModel.kind,
            title: eventSourceModel.kind,
          },
        }),
      };
    },
    {},
  );
  return eventSourceList;
};
