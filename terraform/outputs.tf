output "function_app_name" {
  description = "The name of the Azure Function App"
  value       = azurerm_linux_function_app.function.name
}

output "function_app_url" {
  description = "The default hostname of the Azure Function App"
  value       = "https://${azurerm_linux_function_app.function.default_hostname}/"
}

output "signalr_connection_string" {
  description = "Primary connection string for the Azure SignalR Service"
  value       = azurerm_signalr_service.signalr.primary_connection_string
  sensitive   = true
}

output "resource_group_name" {
  description = "The name of the resource group"
  value       = azurerm_resource_group.rg.name
}

output "signalr_name" {
  description = "The name of the SignalR service"
  value       = azurerm_signalr_service.signalr.name
}

output "storage_connection_string" {
  value       = azurerm_storage_account.storage.primary_connection_string
  description = "Primary connection string for the storage account"
  sensitive   = true
}

