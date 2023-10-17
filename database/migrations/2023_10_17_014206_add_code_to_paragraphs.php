<?php

use App\Models\Paragraph;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('paragraphs', function (Blueprint $table) {
            $table->string('slug', 12)->default('');
        });

        Paragraph::each(function (Paragraph $paragraph) {
            $paragraph->update(['slug' => Paragraph::generateRandomSlug()]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('paragraphs', function (Blueprint $table) {
            $table->dropColumn(['slug']);
        });
    }
};
