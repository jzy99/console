// tslint:disable
/**
 * KubeVirt API
 * This is KubeVirt API an add-on for Kubernetes.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: kubevirt-dev@googlegroups.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { V1Initializer } from './V1Initializer';
import { V1Status } from './V1Status';

/**
 * Initializers tracks the progress of initialization.
 * @export
 * @interface V1Initializers
 */
export interface V1Initializers {
  /**
   * Pending is a list of initializers that must execute in order before this object is visible. When the last pending initializer is removed, and no failing result is set, the initializers struct will be set to nil and the object is considered as initialized and visible to all clients.
   * @type {Array<V1Initializer>}
   * @memberof V1Initializers
   */
  pending: V1Initializer[];
  /**
   *
   * @type {V1Status}
   * @memberof V1Initializers
   */
  result?: V1Status;
}
