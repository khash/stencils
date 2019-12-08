// this amends ingress configuration to generate a SSL certificate with LetsEncrypt.
// it relies on the nginx ingress controller being available on the cluster and the ZoneDNS
// records being created. You can use dns.js transformer to create the ZoneDNS records
// it also assumes you have cert_manager deployed on the cluster. You can do this using the cert_manager.yml stencil
$$.forEach(function($) {
    // Only apply this to Ingress
    if ($.kind != "Ingress") {
        return
    }
    if ($.annotations == null) {
        $.annotations = {}
    }
    $.annotations["kubernetes.io/ingress.class"] = "nginx"
    if ($.spec == null) {
        $.spec = {}
    }
    if ($.spec.tls == null)
    {
        $.spec.tls = []
    }

    $.spec.tls.push({
        secretName: "${concat(service.name, \"-tls\")}",
        hosts: ["${service.endpoint}"]
    })
})