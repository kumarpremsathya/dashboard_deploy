from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
import secrets

class SecurityHeadersMiddleware(MiddlewareMixin):
    def process_response(self, request, response):

        # Generate nonce for inline scripts if needed
        nonce = secrets.token_urlsafe(16)

        response['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        # More permissive CSP that allows common static file requirements

        # Define CSP directives based on environment
        is_development = settings.DEBUG

        csp_directives = "  ".join([
            "default-src 'self'  ",
            "img-src 'self' data: ",
            
           
            # Styles - Consider removing unsafe-inline in production
            f"style-src 'self' {'unsafe-inline' if is_development else f'nonce-{nonce}'} ",
            
            # Scripts - More secure configuration
            f"script-src 'self' {' '.join([
                f'nonce-{nonce}',
                "'unsafe-inline'" if is_development else '',
                "'unsafe-eval'" if is_development else '',
                'blob:',
                'http://127.0.0.1',
                'https://code.jquery.com' 
            ])} ",

            
            # Limit connect-src to specific domains you need
            "connect-src 'self'  http://127.0.0.1 ",
          
            # Add frame-ancestors to prevent clickjacking
            "frame-ancestors 'none' ",
            # Add form-action to protect forms
            "form-action 'self' "
        ])
        
        
        # Filter out None values and join directives
        csp_value = " ".join(csp_directives)
        csp_value = csp_value.replace(" ", "")
        response['Content-Security-Policy'] = csp_value
    
        response['X-XSS-Protection'] = '1; mode=block'
        response['X-Permitted-Cross-Domain-Policies'] = 'none'
        return response
    


