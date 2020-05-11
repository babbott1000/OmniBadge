terraform {
  required_providers {
    digitalocean = ">= 1.18"
  }
}

variable "do_token" {
}

variable "vault_instance_count" {
  default = "1"
}

variable "vault_snapshot_id" {
}

variable "vault_name" {
}

variable "vault_size" {
  default = "s-1vcpu-1gb"
}

variable "vault_private_networking" {
  default = true
}

variable "web_instance_count" {
  default = "1"
}

variable "web_snapshot_id" {
}

variable "web_name" {
}

variable "web_size" {
  default = "s-1vcpu-1gb"
}

variable "web_private_networking" {
  default = true
}

variable "mongo_instance_count" {
  default = "1"
}

variable "mongo_snapshot_id" {
}

variable "mongo_name" {
}

variable "mongo_size" {
  default = "s-1vcpu-1gb"
}

variable "mongo_private_networking" {
  default = true
}

variable "region" {
  default = "nyc3"
}

variable "project" {
}

provider "digitalocean" {
  token = var.do_token
}