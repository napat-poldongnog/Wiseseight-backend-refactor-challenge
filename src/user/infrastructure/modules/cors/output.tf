output "aws_api_gateway_integration_id" {
  value = aws_api_gateway_integration.ResourceOptionsIntegration.id
}

output "aws_api_gateway_integration_response_id" {
  value = aws_api_gateway_integration_response.ResourceOptionsIntegrationResponse.id
}

output "aws_api_gateway_method_id" {
  value = aws_api_gateway_method.ResourceOptions.id
}

output "aws_api_gateway_method_response_id" {
  value = aws_api_gateway_method_response.ResourceOptions200.id
}
