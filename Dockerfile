FROM serversideup/php:8.3-unit

USER root

# Install server dependencies
RUN apt-get update \
    && apt-get install -y ca-certificates gnupg \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs supervisor \
    # && curl --proto '=https' --tlsv1.2 -sSf "https://darkterminal.github.io/turso-php-installer/dist/turso-php-installer.phar" ./turso-php-installer.phar \
    # && mv turso-php-installer.phar /usr/local/bin/turso-php-installer \
    # && turso-php-installer install \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# Install project dependencies
COPY package*.json composer.* ./
RUN composer install --no-dev --no-autoloader --no-scripts --no-interaction && npm install

COPY . .

RUN chmod -R 777 /var/www/html/public && \
    composer dump --no-interaction && \
    npm run build && \
    rm -rf node_modules && \
    find /var/www/html -type d -not -path "./vendor/*" -not -path "./.git/*" -exec chmod 755 "{}" \; && \
    find /var/www/html -type f -not -path "./vendor/*" -not -path "./.git/*" -exec chmod 644 "{}" \; && \
    chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

USER www-data
