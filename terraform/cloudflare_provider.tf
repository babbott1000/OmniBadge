terraform {
  required_providers {
    cloudflare = ">= 2.0"
  }
}

variable cloudflare_api_token {
}

variable cloudflare_zone_id {
  type = string
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
