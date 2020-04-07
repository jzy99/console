import { DeployImageFormData, Resources } from '../import-types';
import { healthChecksProbeInitialData } from '../../health-checks/health-checks-probe-utils';

export const defaultData: DeployImageFormData = {
  project: {
    name: '',
    displayName: '',
    description: '',
  },
  application: {
    initial: '',
    name: '',
    selectedKey: '',
  },
  name: '',
  searchTerm: '',
  registry: 'external',
  imageStream: {
    image: '',
    tag: '',
    namespace: '',
  },
  isi: {
    name: '',
    image: {},
    tag: '',
    status: { metadata: {}, status: '' },
    ports: [],
  },
  image: {
    name: '',
    image: {},
    tag: '',
    status: { metadata: {}, status: '' },
    ports: [],
  },
  isSearchingForImage: false,
  resources: Resources.OpenShift,
  serverless: {
    scaling: {
      minpods: 0,
      maxpods: '',
      concurrencytarget: '',
      concurrencylimit: '',
    },
  },
  route: {
    create: true,
    targetPort: '',
    unknownTargetPort: '',
    defaultUnknownPort: 8080,
    path: '',
    hostname: '',
    secure: false,
    tls: {
      termination: '',
      insecureEdgeTerminationPolicy: '',
      caCertificate: '',
      certificate: '',
      destinationCACertificate: '',
      privateKey: '',
    },
  },
  build: {
    env: [],
    triggers: {
      webhook: true,
      image: true,
      config: true,
    },
    strategy: 'Source',
  },
  deployment: {
    env: [],
    triggers: {
      image: true,
      config: true,
    },
    replicas: 1,
  },
  labels: {},
  env: {},
  limits: {
    cpu: {
      request: '',
      requestUnit: 'm',
      defaultRequestUnit: 'm',
      limit: '',
      limitUnit: 'm',
      defaultLimitUnit: 'm',
    },
    memory: {
      request: '',
      requestUnit: 'Mi',
      defaultRequestUnit: 'Mi',
      limit: '',
      limitUnit: 'Mi',
      defaultLimitUnit: 'Mi',
    },
  },
  healthChecks: healthChecksProbeInitialData,
};

export const dataWithTargetPort: DeployImageFormData = {
  project: { name: 'andrew-test', displayName: '', description: '' },
  application: { initial: '', name: 'helloworld-go-app', selectedKey: 'helloworld-go-app' },
  name: 'helloworld-go',
  searchTerm: 'docker.io/mgencur/helloworld-go',
  registry: 'external',
  imageStream: {
    image: '',
    tag: '',
    namespace: '',
  },
  isi: {
    name: 'docker.io/mgencur/helloworld-go',
    image: {
      metadata: {
        name: 'sha256:e3fff2144ab875b80049424c2e78ed07f142aaa1163d2898fd1cf1cdc2d5fafb',
        creationTimestamp: null,
        annotations: { 'image.openshift.io/dockerLayersOrder': 'ascending' },
      },
      dockerImageReference:
        'docker.io/mgencur/helloworld-go@sha256:e3fff2144ab875b80049424c2e78ed07f142aaa1163d2898fd1cf1cdc2d5fafb',
      dockerImageMetadata: {
        kind: 'DockerImage',
        apiVersion: '1.0',
        Id: 'sha256:951b8b0a7992482c51c79ab1f33dad5055fb81919088708967029949b7540139',
        Created: '2019-09-02T09:48:07Z',
        Container: '800b135a4594c8f5f41efc995e2f36702ccb5d298bbab30138a80d7069fb28ab',
        ContainerConfig: {
          Hostname: '800b135a4594',
          Env: ['PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'],
          Cmd: ['/bin/sh', '-c', '#(nop) ', 'CMD ["/helloworld"]'],
          Image: 'sha256:e24ba0fb0cc2961a69b45b7ce993f1e801c89bf2a11e73da24b67f4d1845e0e3',
        },
        DockerVersion: '18.09.1',
        Config: {
          Env: ['PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'],
          Cmd: ['/helloworld'],
          Image: 'sha256:e24ba0fb0cc2961a69b45b7ce993f1e801c89bf2a11e73da24b67f4d1845e0e3',
        },
        Architecture: 'amd64',
        Size: 6838850,
      },
      dockerImageMetadataVersion: '1.0',
      dockerImageLayers: [
        {
          name: 'sha256:9d48c3bd43c520dc2784e868a780e976b207cbf493eaff8c6596eb871cbd9609',
          size: 2789669,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:ea7536d9b42b1ca044ac6cffb15896bca82ecc06b806ce4bafc2dd0255278c53',
          size: 301806,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:15e02343a7411ae06b565d60ee17b44111b0efedd6c89d25be95414cc79b80ce',
          size: 3745316,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
      ],
      dockerImageManifestMediaType: 'application/vnd.docker.distribution.manifest.v2+json',
    },
    tag: 'latest',
    status: { metadata: {}, status: 'Success' },
    ports: [],
  },
  image: { name: '', image: {}, tag: '', status: { metadata: {}, status: '' }, ports: [] },
  isSearchingForImage: false,
  resources: Resources.OpenShift,
  serverless: {
    scaling: { minpods: 0, maxpods: '', concurrencytarget: '', concurrencylimit: '' },
  },
  route: {
    create: true,
    targetPort: '',
    unknownTargetPort: '6060',
    defaultUnknownPort: 8080,
    path: '',
    hostname: '',
    secure: false,
    tls: {
      termination: '',
      insecureEdgeTerminationPolicy: '',
      caCertificate: '',
      certificate: '',
      destinationCACertificate: '',
      privateKey: '',
    },
  },
  build: { env: [], triggers: { webhook: true, image: true, config: true }, strategy: 'Source' },
  deployment: { env: [], triggers: { image: true, config: true }, replicas: 1 },
  labels: {},
  env: {},
  limits: {
    cpu: {
      request: '',
      requestUnit: 'm',
      defaultRequestUnit: 'm',
      limit: '',
      limitUnit: 'm',
      defaultLimitUnit: 'm',
    },
    memory: {
      request: '',
      requestUnit: 'Mi',
      defaultRequestUnit: 'Mi',
      limit: '',
      limitUnit: 'Mi',
      defaultLimitUnit: 'Mi',
    },
  },
  healthChecks: healthChecksProbeInitialData,
};

export const dataWithPorts: DeployImageFormData = {
  project: { name: 'andrew-test', displayName: '', description: '' },
  application: { initial: '', name: 'helloworld-go-app', selectedKey: 'helloworld-go-app' },
  name: 'test-admin-console',
  searchTerm: 'rohitkrai03/test-admin-console',
  registry: 'external',
  imageStream: {
    image: '',
    tag: '',
    namespace: '',
  },
  isi: {
    name: 'rohitkrai03/test-admin-console',
    image: {
      metadata: {
        name: 'sha256:f63b24904de9c3459e115f27339f032f0f3d2d031a9c8a40933ced5b53a0ad42',
        creationTimestamp: null,
        annotations: { 'image.openshift.io/dockerLayersOrder': 'ascending' },
      },
      dockerImageReference:
        'rohitkrai03/test-admin-console@sha256:f63b24904de9c3459e115f27339f032f0f3d2d031a9c8a40933ced5b53a0ad42',
      dockerImageMetadata: {
        kind: 'DockerImage',
        apiVersion: '1.0',
        Id: 'sha256:1fb3370d964850707e27eaf33e01a8a439933b441120a1e19773aa146c77f36c',
        Created: '2019-01-24T19:37:06Z',
        Container: 'b1b24a34b0a3f688182cd8afa24a4e72808170ddc139edfcbeaf0511aa4f7820',
        ContainerConfig: {
          Hostname: '71c3b758ac0b',
          User: 'fabric8',
          ExposedPorts: { '8080/tcp': {} },
          Env: [
            'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
            'LANG=en_US.utf8',
            'FABRIC8_USER_NAME=fabric8',
          ],
          Cmd: ['/bin/sh', '-c', '#(nop) ', 'USER fabric8'],
          Image: 'sha256:e4a37c3d09818fbc5a4f87b0af9490d11afdc77b3692850348a6cc57dd4e4072',
          Entrypoint: ['/run.sh'],
          Labels: {
            'build-date': '20180302',
            license: 'GPLv2',
            name: 'CentOS Base Image',
            vendor: 'CentOS',
          },
        },
        DockerVersion: '18.09.1',
        Author: '"Devtools <devtools@redhat.com>"',
        Config: {
          Hostname: '71c3b758ac0b',
          User: 'fabric8',
          ExposedPorts: { '8080/tcp': {} },
          Env: [
            'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
            'LANG=en_US.utf8',
            'FABRIC8_USER_NAME=fabric8',
          ],
          Image: 'sha256:e4a37c3d09818fbc5a4f87b0af9490d11afdc77b3692850348a6cc57dd4e4072',
          Entrypoint: ['/run.sh'],
          Labels: {
            'build-date': '20180302',
            license: 'GPLv2',
            name: 'CentOS Base Image',
            vendor: 'CentOS',
          },
        },
        Architecture: 'amd64',
        Size: 118060996,
      },
      dockerImageMetadataVersion: '1.0',
      dockerImageLayers: [
        {
          name: 'sha256:ce7198b3520e7e6ab1fbc01b4183b2c5630f71946ec625f28a5771d1655166c1',
          size: 72978710,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:5890870b49f8f61988c05ce11c6d3d119fab4f935b77002b0e7a530440218b6b',
          size: 251,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:58792e57e3747424376bc264bf62f5f37e721ea43f5403e808e2bdf8ac4a1846',
          size: 22065481,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:eeb8ae0043c769a7fc5dc984ea865ce60a868b71c1d038427814cdd16d703f76',
          size: 1072,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:52045258273fcf3dcd0de2b88d9633d32d92532aeb1cc3f40441c3850f054015',
          size: 169,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:60b5e8ff2b23c1f081e2396624becc9da5bfbdaca32ea0968cc0e5787e6934b7',
          size: 5236,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:d1b0400a7502760a8584854eb9cf75c05fea421b42b7140047f67aa6d0624a16',
          size: 221,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:0d31c77a1a3108f68f2115dcf58abbe0a6e782de79271fbb2bda3b3fb8f390a7',
          size: 169,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:415b436428193fd50b9ec878adab378dd51386485e197c994d3002db28b88fc0',
          size: 7424104,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:61b6c523c9ab309dc0265764e3132ed608dde8f1f28a9f4bb596d611e4b5ec74',
          size: 1565,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:731ed097de942855e7cc2ef25977ce866ccee95209c786ef5415b25c10cb4933',
          size: 257,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:22089413237cca69df14f51ed8fa1fc43047fc3fa39c49e4c42d4522d3624de8',
          size: 1616,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:f43861cdbb90f01a99ac9ed271fdfcba7e3bd8c4466f49e9c7d2a353f2366c49',
          size: 439,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:129d2d03fe6196990370bf6a6ad9029d1b3b56950d392b301971e386d5529013',
          size: 6137,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:53790883252d26d3e5cef474e2770ef07cb8f2bb58ae377e4b14e61db621bc12',
          size: 231,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:2c494d187a60d2d1a7a0b7bc042af978996b000c4f700c6d3734eec557fab4c3',
          size: 173,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:4f3a2e3f6386d7ca131b0e03d130868d4b44d3ed25aa689f6be473ded368d4a9',
          size: 7782854,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:18780ad4a075cd88e26292902decad36463aac956b1d636a8d5b6d5d054ff100',
          size: 7782848,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
      ],
      dockerImageManifestMediaType: 'application/vnd.docker.distribution.manifest.v2+json',
    },
    tag: 'latest',
    status: { metadata: {}, status: 'Success' },
    ports: [{ containerPort: 8081, protocol: 'TCP' }],
  },
  image: {
    name: '',
    image: {},
    tag: '',
    status: { metadata: {}, status: '' },
    ports: [{ containerPort: 8080, protocol: 'TCP' }],
  },
  isSearchingForImage: false,
  resources: Resources.OpenShift,
  serverless: {
    scaling: { minpods: 0, maxpods: '', concurrencytarget: '', concurrencylimit: '' },
  },
  route: {
    create: true,
    targetPort: '',
    unknownTargetPort: '',
    defaultUnknownPort: 8080,
    path: '',
    hostname: '',
    secure: false,
    tls: {
      termination: '',
      insecureEdgeTerminationPolicy: '',
      caCertificate: '',
      certificate: '',
      destinationCACertificate: '',
      privateKey: '',
    },
  },
  build: { env: [], triggers: { webhook: true, image: true, config: true }, strategy: 'Source' },
  deployment: { env: [], triggers: { image: true, config: true }, replicas: 1 },
  labels: {},
  env: {},
  limits: {
    cpu: {
      request: '',
      requestUnit: 'm',
      defaultRequestUnit: 'm',
      limit: '',
      limitUnit: 'm',
      defaultLimitUnit: 'm',
    },
    memory: {
      request: '',
      requestUnit: 'Mi',
      defaultRequestUnit: 'Mi',
      limit: '',
      limitUnit: 'Mi',
      defaultLimitUnit: 'Mi',
    },
  },
  healthChecks: healthChecksProbeInitialData,
};

export const dataWithoutPorts: DeployImageFormData = {
  project: { name: 'andrew-test', displayName: '', description: '' },
  application: { initial: '', name: 'helloworld-go-app', selectedKey: '#CREATE_APPLICATION_KEY#' },
  name: 'helloworld-go',
  searchTerm: 'docker.io/mgencur/helloworld-go',
  registry: 'external',
  imageStream: {
    image: '',
    tag: '',
    namespace: '',
  },
  isi: {
    name: 'docker.io/mgencur/helloworld-go',
    image: {
      metadata: {
        name: 'sha256:e3fff2144ab875b80049424c2e78ed07f142aaa1163d2898fd1cf1cdc2d5fafb',
        creationTimestamp: null,
        annotations: { 'image.openshift.io/dockerLayersOrder': 'ascending' },
      },
      dockerImageReference:
        'docker.io/mgencur/helloworld-go@sha256:e3fff2144ab875b80049424c2e78ed07f142aaa1163d2898fd1cf1cdc2d5fafb',
      dockerImageMetadata: {
        kind: 'DockerImage',
        apiVersion: '1.0',
        Id: 'sha256:951b8b0a7992482c51c79ab1f33dad5055fb81919088708967029949b7540139',
        Created: '2019-09-02T09:48:07Z',
        Container: '800b135a4594c8f5f41efc995e2f36702ccb5d298bbab30138a80d7069fb28ab',
        ContainerConfig: {
          Hostname: '800b135a4594',
          Env: ['PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'],
          Cmd: ['/bin/sh', '-c', '#(nop) ', 'CMD ["/helloworld"]'],
          Image: 'sha256:e24ba0fb0cc2961a69b45b7ce993f1e801c89bf2a11e73da24b67f4d1845e0e3',
        },
        DockerVersion: '18.09.1',
        Config: {
          Env: ['PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'],
          Cmd: ['/helloworld'],
          Image: 'sha256:e24ba0fb0cc2961a69b45b7ce993f1e801c89bf2a11e73da24b67f4d1845e0e3',
        },
        Architecture: 'amd64',
        Size: 6838850,
      },
      dockerImageMetadataVersion: '1.0',
      dockerImageLayers: [
        {
          name: 'sha256:9d48c3bd43c520dc2784e868a780e976b207cbf493eaff8c6596eb871cbd9609',
          size: 2789669,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:ea7536d9b42b1ca044ac6cffb15896bca82ecc06b806ce4bafc2dd0255278c53',
          size: 301806,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
        {
          name: 'sha256:15e02343a7411ae06b565d60ee17b44111b0efedd6c89d25be95414cc79b80ce',
          size: 3745316,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
      ],
      dockerImageManifestMediaType: 'application/vnd.docker.distribution.manifest.v2+json',
    },
    tag: 'latest',
    status: { metadata: {}, status: 'Success' },
    ports: [],
  },
  image: { name: '', image: {}, tag: '', status: { metadata: {}, status: '' }, ports: [] },
  isSearchingForImage: false,
  resources: Resources.OpenShift,
  serverless: {
    scaling: { minpods: 0, maxpods: '', concurrencytarget: '', concurrencylimit: '' },
  },
  route: {
    create: true,
    targetPort: '',
    unknownTargetPort: '',
    defaultUnknownPort: 8080,
    path: '',
    hostname: '',
    secure: false,
    tls: {
      termination: '',
      insecureEdgeTerminationPolicy: '',
      caCertificate: '',
      certificate: '',
      destinationCACertificate: '',
      privateKey: '',
    },
  },
  build: { env: [], triggers: { webhook: true, image: true, config: true }, strategy: 'Source' },
  deployment: { env: [], triggers: { image: true, config: true }, replicas: 1 },
  labels: {},
  env: {},
  limits: {
    cpu: {
      request: '',
      requestUnit: 'm',
      defaultRequestUnit: 'm',
      limit: '',
      limitUnit: 'm',
      defaultLimitUnit: 'm',
    },
    memory: {
      request: '',
      requestUnit: 'Mi',
      defaultRequestUnit: 'Mi',
      limit: '',
      limitUnit: 'Mi',
      defaultLimitUnit: 'Mi',
    },
  },
  healthChecks: healthChecksProbeInitialData,
};

export const internalImageData: DeployImageFormData = {
  project: {
    name: 'gijohn',
    displayName: '',
    description: '',
  },
  application: {
    initial: '',
    name: 'react-web-app-app',
    selectedKey: 'react-web-app-app',
  },
  name: 'react-web-app',
  searchTerm: '',
  registry: 'internal',
  imageStream: {
    image: 'react-web-app',
    tag: 'latest',
    namespace: 'gijohn',
  },
  isi: {
    name: 'react-web-app',
    image: {
      metadata: {
        name: 'sha256:22319276ebe1b647149d5d95e1bef4252c274238e5634d54b7ce7bd17bcbcf14',
        uid: '2f607e52-155d-4df0-94e7-6c3491dca25f',
        resourceVersion: '904202',
        creationTimestamp: '2019-11-06T15:47:09Z',
        annotations: {
          'image.openshift.io/dockerLayersOrder': 'ascending',
          'image.openshift.io/manifestBlobStored': 'true',
          'openshift.io/image.managed': 'true',
        },
      },
      dockerImageReference:
        'image-registry.openshift-image-registry.svc:5000/gijohn/react-web-app@sha256:22319276ebe1b647149d5d95e1bef4252c274238e5634d54b7ce7bd17bcbcf14',
      dockerImageMetadata: {
        kind: 'DockerImage',
        apiVersion: '1.0',
        Id: 'sha256:3b122319471263a30eec9cf017f9962e07fb0da81071ce40fe54cac099e9276d',
        Parent: 'sha256:422a455bb50a03b1d0204d7c2655cbb15c30a2d454b46e5dfe81c949e34aba81',
        Created: '2019-11-06T15:46:13Z',
        ContainerConfig: {
          Hostname: 'c7fd0b8bf79b',
          User: '1001',
          ExposedPorts: {
            '8080/tcp': {},
          },
          Image: '22f29f4a9ae450b18b231b35469f8558726377b69ea1111d7632f174468ef4ec',
          WorkingDir: '/opt/app-root/src',
          Entrypoint: ['container-entrypoint'],
          Labels: {
            architecture: 'x86_64',
            'authoritative-source-url': 'registry.access.redhat.com',
            'build-date': '2019-09-05T10:56:20.275031',
            'com.redhat.build-host': 'cpt-1005.osbs.prod.upshift.rdu2.redhat.com',
            'com.redhat.component': 'rhoar-nodejs-webapp-container',
            'com.redhat.deployments-dir': '/opt/app-root/src',
            'com.redhat.dev-mode': 'DEV_MODE:false',
            'com.redhat.dev-mode.port': 'DEBUG_PORT:5858',
            'com.redhat.license_terms':
              'https://www.redhat.com/en/about/red-hat-end-user-license-agreements',
            description: 'Web Application building with Node.js',
            'distribution-scope': 'public',
            'io.k8s.description': 'Web Application building with Node.js',
            'io.k8s.display-name': 'Node.js Web Builder 10.16.3',
            'io.openshift.build.commit.author': 'Lucas Holmquist <lholmqui@redhat.com>',
            'io.openshift.build.commit.date': 'Thu Apr 11 12:32:29 2019 -0400',
            'io.openshift.build.commit.id': '32b53d1a23d8148077f2095226bd4e8afcd1ce4a',
            'io.openshift.build.commit.message': 'chore: text updates',
            'io.openshift.build.commit.ref': 'master',
            'io.openshift.build.image':
              'image-registry.openshift-image-registry.svc:5000/openshift/modern-webapp@sha256:eb672caddbf6f1d2283ecc2e7f69142bd605f5a0067c951dd9b829f29343edc4',
            'io.openshift.build.source-context-dir': '/',
            'io.openshift.build.source-location':
              'https://github.com/nodeshift-starters/react-web-app',
            'io.openshift.expose-services': '8080:http',
            'io.openshift.s2i.scripts-url': 'image:///usr/libexec/s2i',
            'io.openshift.tags': 'builder,nodejs',
            'io.s2i.scripts-url': 'image:///usr/libexec/s2i',
            maintainer: 'Lucas Holmquist <lholmqui@redhat.com>',
            name: 'rhoar-nodejs/nodejs-10-webapp',
            release: '1',
            summary: 'Platform for building Modern Web Applications that use Node.js',
            url:
              'https://access.redhat.com/containers/#/registry.access.redhat.com/rhoar-nodejs/nodejs-10-webapp/images/10.16.3-1',
            usage: 's2i build . rhoar-nodejs/nodejs-10 myapp',
            'vcs-ref': '78097b3d9251ae23fd9d381fcfd9e9ed30db34dd',
            'vcs-type': 'git',
            vendor: 'Red Hat, Inc.',
            version: '10.16.3',
          },
        },
        Config: {
          Hostname: 'c7fd0b8bf79b',
          User: '1001',
          ExposedPorts: {
            '8080/tcp': {},
          },
          Env: [
            'OPENSHIFT_BUILD_SOURCE=https://github.com/nodeshift-starters/react-web-app',
            'OPENSHIFT_BUILD_COMMIT=32b53d1a23d8148077f2095226bd4e8afcd1ce4a',
          ],
          Cmd: ['/bin/sh', '-c', '/usr/libexec/s2i/run'],
          Image: '22f29f4a9ae450b18b231b35469f8558726377b69ea1111d7632f174468ef4ec',
          WorkingDir: '/opt/app-root/src',
          Entrypoint: ['container-entrypoint'],
          Labels: {
            architecture: 'x86_64',
            'authoritative-source-url': 'registry.access.redhat.com',
            'build-date': '2019-09-05T10:56:20.275031',
            'com.redhat.build-host': 'cpt-1005.osbs.prod.upshift.rdu2.redhat.com',
            'com.redhat.component': 'rhoar-nodejs-webapp-container',
            'com.redhat.deployments-dir': '/opt/app-root/src',
            'com.redhat.dev-mode': 'DEV_MODE:false',
            'com.redhat.dev-mode.port': 'DEBUG_PORT:5858',
            'com.redhat.license_terms':
              'https://www.redhat.com/en/about/red-hat-end-user-license-agreements',
            description: 'Web Application building with Node.js',
            'distribution-scope': 'public',
            'io.k8s.description': 'Web Application building with Node.js',
            'io.k8s.display-name': 'Node.js Web Builder 10.16.3',
            'io.openshift.build.commit.author': 'Lucas Holmquist <lholmqui@redhat.com>',
            'io.openshift.build.commit.date': 'Thu Apr 11 12:32:29 2019 -0400',
            'io.openshift.build.commit.id': '32b53d1a23d8148077f2095226bd4e8afcd1ce4a',
            'io.openshift.build.commit.message': 'chore: text updates',
            'io.openshift.build.commit.ref': 'master',
            'io.openshift.build.image':
              'image-registry.openshift-image-registry.svc:5000/openshift/modern-webapp@sha256:eb672caddbf6f1d2283ecc2e7f69142bd605f5a0067c951dd9b829f29343edc4',
            'io.openshift.build.source-context-dir': '/',
            'io.openshift.build.source-location':
              'https://github.com/nodeshift-starters/react-web-app',
            'io.openshift.expose-services': '8080:http',
            'io.openshift.s2i.scripts-url': 'image:///usr/libexec/s2i',
            'io.openshift.tags': 'builder,nodejs',
            'io.s2i.scripts-url': 'image:///usr/libexec/s2i',
            maintainer: 'Lucas Holmquist <lholmqui@redhat.com>',
            name: 'rhoar-nodejs/nodejs-10-webapp',
            release: '1',
            summary: 'Platform for building Modern Web Applications that use Node.js',
            url:
              'https://access.redhat.com/containers/#/registry.access.redhat.com/rhoar-nodejs/nodejs-10-webapp/images/10.16.3-1',
            usage: 's2i build . rhoar-nodejs/nodejs-10 myapp',
            'vcs-ref': '78097b3d9251ae23fd9d381fcfd9e9ed30db34dd',
            'vcs-type': 'git',
            vendor: 'Red Hat, Inc.',
            version: '10.16.3',
          },
        },
        Architecture: 'amd64',
        Size: 259895912,
      },
      dockerImageMetadataVersion: '1.0',
      dockerImageLayers: [
        {
          name: 'sha256:5af42566e7d1943de0196a7d22dc5abb18d916ae5cdb762dffd28d305a11ad41',
          size: 76243858,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar',
        },
        {
          name: 'sha256:c48c210d99473f38a9f6e58c56cb5ec8674f3347c62917346a160e2bfbc43bde',
          size: 1617,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar',
        },
        {
          name: 'sha256:caa1771d2710f104d1441da00e8b236c3ba9cde637dc60c066bdb99ebe40412b',
          size: 7194722,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar',
        },
        {
          name: 'sha256:d49b8d97a29c461dfa980414df4295d43af55fc29fb51d63deba3df6198a8b91',
          size: 86668085,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar',
        },
        {
          name: 'sha256:dfa32611d40bb3d014ffd60585c960f1c9b18070d438ad2886ac63f13ae80d19',
          size: 26739159,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar',
        },
        {
          name: 'sha256:22d500e07d1b96bc80b29164dc9ea86d4421c1ed561c33d6c220e7124cacfef3',
          size: 3390,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar',
        },
        {
          name: 'sha256:e56b8324fc39e8445b2aa598054ea409509ba0723cdf10d7bb70132132784e8b',
          size: 63035115,
          mediaType: 'application/vnd.docker.image.rootfs.diff.tar.gzip',
        },
      ],
      dockerImageManifestMediaType: 'application/vnd.docker.distribution.manifest.v2+json',
    },
    tag: 'latest',
    status: {
      metadata: {},
      status: '',
    },
    ports: [
      {
        containerPort: 8080,
        protocol: 'TCP',
      },
    ],
  },
  image: {
    name: '',
    image: {},
    tag: '',
    status: {
      metadata: {},
      status: '',
    },
    ports: [
      {
        containerPort: 8080,
        protocol: 'TCP',
      },
    ],
  },
  isSearchingForImage: false,
  serverless: {
    scaling: {
      minpods: 0,
      maxpods: '',
      concurrencytarget: '',
      concurrencylimit: '',
    },
  },
  route: {
    create: true,
    targetPort: '8080-tcp',
    unknownTargetPort: '',
    defaultUnknownPort: 8080,
    path: '',
    hostname: '',
    secure: false,
    tls: {
      termination: '',
      insecureEdgeTerminationPolicy: '',
      caCertificate: '',
      certificate: '',
      destinationCACertificate: '',
      privateKey: '',
    },
  },
  resources: Resources.Kubernetes,
  build: {
    env: [],
    triggers: {
      webhook: true,
      image: true,
      config: true,
    },
    strategy: 'Source',
  },
  deployment: {
    env: [],
    triggers: {
      image: true,
      config: true,
    },
    replicas: 1,
  },
  labels: {},
  env: {},
  limits: {
    cpu: {
      request: '',
      requestUnit: 'm',
      defaultRequestUnit: 'm',
      limit: '',
      limitUnit: 'm',
      defaultLimitUnit: 'm',
    },
    memory: {
      request: '',
      requestUnit: 'Mi',
      defaultRequestUnit: 'Mi',
      limit: '',
      limitUnit: 'Mi',
      defaultLimitUnit: 'Mi',
    },
  },
  healthChecks: healthChecksProbeInitialData,
};
