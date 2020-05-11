resource "digitalocean_droplet" "vault" {
    count = var.instance_count
    image = var.snapshot_id
    name = var.name
    region = var.region
    size = var.size
    private_networking = true
}

resource "digitalocean_project_resources" "project" {
    project = var.project
    resources = digitalocean_droplet.vault[*].urn
}