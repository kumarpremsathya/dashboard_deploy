from django.utils.deprecation import MiddlewareMixin

class SecurityHeadersMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        response['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        # More permissive CSP that allows common static file requirements
        csp_directives = [
            # Base directive
            "default-src 'self'",
            
            # Images - allow from same origin, data URIs, and HTTPS sources
            "img-src 'self' data: blob: https: *",
            
            # Styles - allow from same origin, inline styles, and blob
            "style-src 'self' 'unsafe-inline' blob:",
            
            # Scripts - comprehensive permissions for JavaScript
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https:",
            
            # Fonts - allow from same origin and data URIs
            "font-src 'self' data: https:",
            
            # Connect (Ajax, WebSocket, etc)
            "connect-src 'self' ws: wss: https: *",
            
            # Media
            "media-src 'self' blob: data:",
            
            # Object/Embed content
            "object-src 'self'",
            
            # Form actions
            "form-action 'self'",
            
            # Frame sources
            "frame-src 'self'",
            
            # Worker sources
            "worker-src 'self' blob:",
            
            # Manifest files
            "manifest-src 'self'"
        ]
        response['Content-Security-Policy'] = "; ".join(csp_directives)
        response['X-XSS-Protection'] = '1; mode=block'
        response['X-Permitted-Cross-Domain-Policies'] = 'none'
        return response
