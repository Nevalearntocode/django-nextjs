from django.contrib import admin
from django.urls import path, include
from customauth.views import LogoutView

urlpatterns = [
    # /users/: Submitting a POST request to this route creates a new user account on the Django backend, serving as the registration process.
    # /users/me/: A GET request to this endpoint returns information about the currently authenticated user, requiring the user to be logged in.
    # /users/reset_password/: A POST request here initiates a password reset process by sending an email to the provided address with a password reset link, but only if the user account exists.
    # /users/reset_password_confirm/: By making a POST request to this route with the uid, token, and new_password, the user can reset their password to the new value specified in the new_password field.
    path("auth/", include("djoser.urls")),
    # /jwt/create/: This endpoint is used for logging in, where it authenticates the user and returns a JWT for subsequent authenticated requests.
    # /jwt/refresh/: This endpoint is for refreshing an existing access token by providing a valid refresh token, thus granting a new access token.
    path("auth/", include("djoser.urls.jwt")),
    path("auth/logout/", LogoutView.as_view()),
]
