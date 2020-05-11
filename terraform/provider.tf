terraform {
  required_providers {
    digitalocean = ">= 1.18"
  }
  required_version = ">= 0.12"
}

variable "do_token" {
}

variable "instance_count" {
  default = "1"
}

variable "snapshot_id" {
}

variable "name" {
}

variable "region" {
  default = "nyc3"
}

variable "size" {
  default = "s-1vcpu-1gb"
}

variable "private_networking" {
  default = true
}

variable "project" {
}

provider "digitalocean" {
  token = var.do_token
}