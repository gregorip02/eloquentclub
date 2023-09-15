<?php

test('home page is displayed', function () {
    $this->get('/')->assertOk();
});
