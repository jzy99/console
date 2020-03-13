FROM aae2419ab8e8

#RUN mkdir -p /go/src/github.com/openshift/console/
ADD  ./bridge /opt/bridge/bin/bridge
#WORKDIR /go/src/github.com/openshift/console/
#RUN ./build.sh
#
#FROM openshift/origin-base
#
#COPY --from=build /go/src/github.com/openshift/console/frontend/public/dist /opt/bridge/static
#COPY --from=build /go/src/github.com/openshift/console/bin/bridge /opt/bridge/bin/bridge
#COPY --from=build /go/src/github.com/openshift/console/examples/bridge.sh /opt/bridge/bin/run-bridge.sh
#
#LABEL io.k8s.display-name="OpenShift Console" \
#      io.k8s.description="This is a component of OpenShift Container Platform and provides a web console." \
#      io.openshift.tags="openshift" \
#      maintainer="Samuel Padgett <spadgett@redhat.com>"
#
## doesn't require a root user.
USER 0
#
#
#CMD [ "/opt/bridge/bin/bridge", "--public-dir=/opt/bridge/static" ]