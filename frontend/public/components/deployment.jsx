import * as React from 'react';

import { DeploymentModel } from '../models';
import { configureUpdateStrategyModal, configureRevisionHistoryLimitModal } from './modals';
import { DetailsPage, List, ListPage, WorkloadListHeader, WorkloadListRow } from './factory';
import { Cog, DeploymentPodCounts, navFactory, LoadingInline, pluralize, ResourceSummary } from './utils';
import { registerTemplate } from '../yaml-templates';
import { Conditions } from './conditions';
import { EnvironmentPage } from './environment';
import { ResourceEventStream } from './events';

registerTemplate('apps/v1.Deployment', `apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  selector:
    matchLabels:
      app: hello-openshift
  replicas: 3
  template:
    metadata:
      labels:
        app: hello-openshift
    spec:
      containers:
      - name: hello-openshift
        image: openshift/hello-openshift
        ports:
        - containerPort: 8080`);

const {ModifyCount, ModifyNodeSelector, EditEnvironment, common} = Cog.factory;

const RevisionHistory = (kind, deployment) => ({
  label: 'Revision History...',
  callback: () => configureRevisionHistoryLimitModal({deployment}),
});

const UpdateStrategy = (kind, deployment) => ({
  label: 'Update Strategy...',
  callback: () => configureUpdateStrategyModal({deployment}),
});

const menuActions = [
  ModifyCount,
  RevisionHistory,
  UpdateStrategy,
  ModifyNodeSelector,
  EditEnvironment,
  ...common,
];

const DeploymentDetails = ({obj: deployment}) => {
  const isRecreate = (deployment.spec.strategy.type === 'Recreate');

  return <React.Fragment>
    <div className="co-m-pane__body">
      <DeploymentPodCounts resource={deployment} resourceKind={DeploymentModel} />

      <div className="co-m-pane__body-group">
        <div className="row">
          <div className="col-sm-6">
            <ResourceSummary resource={deployment}>
              <dt>Status</dt>
              <dd>{deployment.status.availableReplicas === deployment.status.updatedReplicas ? <span>Active</span> : <div><span className="co-icon-space-r"><LoadingInline /></span> Updating</div>}</dd>
            </ResourceSummary>
          </div>
          <div className="col-sm-6">
            <dl className="co-m-pane__details">
              <dt>Update Strategy</dt>
              <dd>{deployment.spec.strategy.type || 'RollingUpdate'}</dd>
              {isRecreate || <dt>Max Unavailable</dt>}
              {isRecreate || <dd>{deployment.spec.strategy.rollingUpdate.maxUnavailable || 1} of {pluralize(deployment.spec.replicas, 'pod')}</dd>}
              {isRecreate || <dt>Max Surge</dt>}
              {isRecreate || <dd>{deployment.spec.strategy.rollingUpdate.maxSurge || 1} greater than {pluralize(deployment.spec.replicas, 'pod')}</dd>}
              <dt>Min Ready Seconds</dt>
              <dd>{deployment.spec.minReadySeconds ? pluralize(deployment.spec.minReadySeconds, 'second') : 'Not Configured'}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div className="co-m-pane__body">
      <h1 className="co-section-title">Conditions</h1>
      <Conditions conditions={deployment.status.conditions} />
    </div>
  </React.Fragment>;
};

const envPath = ['spec','template','spec','containers'];
const environmentComponent = (props) => <EnvironmentPage
  obj={props.obj}
  rawEnvData={props.obj.spec.template.spec.containers}
  envPath={envPath}
  readOnly={false}
/>;

const {details, editYaml, pods, envEditor, events} = navFactory;
const DeploymentsDetailsPage = props => <DetailsPage
  {...props}
  menuActions={menuActions}
  pages={[details(DeploymentDetails), editYaml(), pods(), envEditor(environmentComponent), events(ResourceEventStream)]}
/>;

const Row = props => <WorkloadListRow {...props} kind="Deployment" actions={menuActions} />;
const DeploymentsList = props => <List {...props} Header={WorkloadListHeader} Row={Row} />;
const DeploymentsPage = props => <ListPage canCreate={true} ListComponent={DeploymentsList} {...props} />;

export {DeploymentsList, DeploymentsPage, DeploymentsDetailsPage};
