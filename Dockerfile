FROM serversideup/php:8.3-unit

USER root

# Install server dependencies
RUN apt-get update \
    && apt-get install -y ca-certificates gnupg \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

USER www-data

COPY --chown=www-data:www-data . .

RUN composer install --no-dev --no-interaction && \
    npm ci && \
    npm run build && \
    rm -rf node_modules/ && \
    chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/public
