resource "digitalocean_droplet" "vault" {
    count              = var.vault_instance_count
    image              = var.vault_snapshot_id
    name               = var.vault_name
    size               = var.vault_size
    region             = var.region
    private_networking = var.vault_private_networking
}

resource "digitalocean_droplet" "web" {
    count              = var.web_instance_count
    image              = var.web_snapshot_id
    name               = var.web_name
    size               = var.web_size
    region             = var.region
    private_networking = var.web_private_networking
}

resource "digitalocean_droplet" "mongo" {
    count              = var.mongo_instance_count
    image              = var.mongo_snapshot_id
    name               = var.mongo_name
    size               = var.mongo_size
    region             = var.region
    private_networking = var.mongo_private_networking
}

resource "digitalocean_project_resources" "project" {
    project   = var.project
    resources = concat(digitalocean_droplet.vault[*].urn, digitalocean_droplet.web[*].urn, digitalocean_droplet.mongo[*].urn)
}

resource "cloudflare_record" "vault_record" {
    zone_id = var.cloudflare_zone_id
    name    = "vault"
    value   = digitalocean_droplet.vault[*].ipv4_address
    type    = "A"
}

resource "cloudflare_record" "web_record" {
    zone_id = var.cloudflare_zone_id
    name    = "omnibadge.com"
    value   = digitalocean_droplet.web[*].ipv4_address
    type    = "A"
}

resource "cloudflare_record" "mongo_record" {
    zone_id = var.cloudflare_zone_id
    name    = "mongo"
    value   = digitalocean_droplet.mongo[*].ipv4_address
    type    = "A"
}