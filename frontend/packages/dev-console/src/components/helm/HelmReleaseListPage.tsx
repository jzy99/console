import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Helmet from 'react-helmet';
import { PageHeading, Firehose } from '@console/internal/components/utils';
import { SecretModel } from '@console/internal/models';
import ProjectListPage from '../projects/ProjectListPage';
import NamespacedPage, { NamespacedPageVariants } from '../NamespacedPage';
import HelmReleaseList from './list/HelmReleaseList';

type HelmReleaseListPageProps = RouteComponentProps<{ ns: string }>;

export const HelmReleaseListPage: React.FC<HelmReleaseListPageProps> = (props) => {
  const {
    match: {
      params: { ns: namespace },
    },
  } = props;

  const resources = [
    {
      isList: true,
      namespace,
      kind: SecretModel.kind,
      prop: 'secrets',
      optional: true,
      selector: { owner: 'helm' },
    },
  ];
  return namespace ? (
    <NamespacedPage variant={NamespacedPageVariants.light} hideApplications>
      <Helmet>
        <title>Helm Releases</title>
      </Helmet>
      <div>
        <PageHeading title="Helm Releases" />
        <Firehose resources={resources}>
          <HelmReleaseList namespace={namespace} />
        </Firehose>
      </div>
    </NamespacedPage>
  ) : (
    <ProjectListPage title="Helm Releases">
      Select a project to view the list of Helm Releases
    </ProjectListPage>
  );
};

export default HelmReleaseListPage;
