provider "azurerm" {
  features {}

  use_cli         = true
  subscription_id = "3ea491f0-413f-4562-b1ac-61392523a544"
  tenant_id       = "33cc8466-025b-4665-b338-57fc5a7e1341"
}

resource "random_string" "suffix" {
  length  = 6
  upper   = false
  special = false
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_storage_account" "storage" {
  name                     = "${var.project}sa${random_string.suffix.result}"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_service_plan" "function_plan" {
  name                = "${var.project}-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "Y1" # Serverless Consumption Plan
}

resource "azurerm_signalr_service" "signalr" {
  name                = "${var.project}-signalr-${random_string.suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku {
    name     = "Free_F1"
    capacity = 1
  }
}

resource "azurerm_linux_function_app" "function" {
  name                       = "${var.project}-functions"
  resource_group_name        = azurerm_resource_group.rg.name
  location                   = azurerm_resource_group.rg.location
  storage_account_name       = azurerm_storage_account.storage.name
  storage_account_access_key = azurerm_storage_account.storage.primary_access_key
  service_plan_id            = azurerm_service_plan.function_plan.id

  site_config {
    application_stack {
      node_version = "18"
    }
  }

  app_settings = {
    AzureWebJobsStorage        = azurerm_storage_account.storage.primary_connection_string
    FUNCTIONS_WORKER_RUNTIME   = "node"
    SIGNALR_CONNECTION_STRING  = azurerm_signalr_service.signalr.primary_connection_string
  }
}
