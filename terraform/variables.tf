variable "project" {
  type        = string
  description = "Project name to prefix resources"
}

variable "resource_group_name" {
  type        = string
  description = "Name of the resource group"
}

variable "location" {
  type        = string
  description = "Azure region for all resources"
}
