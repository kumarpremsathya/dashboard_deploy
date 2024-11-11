from django.utils.deprecation import MiddlewareMixin

# class DisableCSRFMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         # Check if the request path starts with the specified API path
#         if request.path.startswith('/api/v1/'):  # Specify your API version path
#             setattr(request, '_dont_enforce_csrf_checks', True)


class RemoveServerHeaderMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Remove or override headers that expose server information
        headers_to_remove = ['Server']
        for header in headers_to_remove:
            response.headers[header] = ""  # Explicitly set to an empty string
        return response