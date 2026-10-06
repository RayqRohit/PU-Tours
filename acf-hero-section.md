# ACF Implementation Guide: PU Tours - Hero Section

Here is the complete guide and PHP code for converting your Hero Section into a dynamic, editable block using WordPress Advanced Custom Fields (ACF).

## 1. ACF Field Configurations (Structure)

Create a new Field Group in your WordPress backend called **"Hero Section"** (Location rule: *Page Template is equal to PU Tours*). 

Use the following fields. **Make sure to use the exact Field Names provided below (they use the `pu_tours_` prefix as requested).**

| Field Label | Field Name | Field Type | Instructions / Notes |
| ----------- | ---------- | ---------- | -------------------- |
| **Hero Section (Tab)** | `pu_tours_hero_tab` | Tab | **Placement: Left aligned**. This creates a sidebar tab in WP. |
| **Hero Background Image** | `pu_tours_hero_background_image` | Image | Return Format: **Image URL** |
| **Hero Badge Text** | `pu_tours_hero_badge_text` | Text | Put `&middot;` for the dot. Example: *Practical Learning Tours &middot; 2025-26* |
| **Hero Title** | `pu_tours_hero_title` | Text | Example: *Experience the Industry While You Study* |
| **Hero Subtitle** | `pu_tours_hero_subtitle` | Textarea | Controls the main paragraph. Set New Lines to "Automatically add `<br>`" |
| **Button 1 Text** | `pu_tours_hero_button_1_text` | Text | Example: *Browse all 27 tours* |
| **Button 1 Action ID** | `pu_tours_hero_button_1_id` | Text | Used for JS scroll targeting. Default: `browse-tours-btn` |
| **Button 2 Text** | `pu_tours_hero_button_2_text` | Text | Example: *Meet the leaders* |
| **Button 2 Action ID** | `pu_tours_hero_button_2_id` | Text | Used for JS scroll targeting. Default: `meet-leaders-btn` |

---

## 2. ACF Default Values (To copy into WP backend)

When you create the page in WordPress, copy and paste these exact values into the ACF fields so it looks identical to your static design:

- **pu_tours_hero_badge_text**: `Practical Learning Tours &middot; 2025-26`
- **pu_tours_hero_title**: `Experience the Industry While You Study`
- **pu_tours_hero_subtitle**: `Parul University takes students beyond classroom theory and into working laboratories, boardrooms, hospitals, project sites, courtrooms and factory floors, with faculty-led access to named experts and leading organizations.`
- **pu_tours_hero_button_1_text**: `Browse all 27 tours`
- **pu_tours_hero_button_1_id**: `browse-tours-btn`
- **pu_tours_hero_button_2_text**: `Meet the leaders`
- **pu_tours_hero_button_2_id**: `meet-leaders-btn`

---

## 3. The PHP ACF Integration Code

Replace lines `9` to `38` in your `fix-scrolling.html` (which is actually your PHP template) with the following dynamic code. It safely fetches the ACF fields and falls back to your default text if a field is empty.

```php
<?php
  // Fetch ACF Fields
  $hero_bg_image = get_field('pu_tours_hero_background_image');
  $hero_badge    = get_field('pu_tours_hero_badge_text');
  $hero_title    = get_field('pu_tours_hero_title');
  $hero_subtitle = get_field('pu_tours_hero_subtitle');
  
  // Buttons with fallback defaults for JS targeting
  $hero_btn1_text = get_field('pu_tours_hero_button_1_text') ?: 'Browse all 27 tours';
  $hero_btn1_id   = get_field('pu_tours_hero_button_1_id') ?: 'browse-tours-btn';
  
  $hero_btn2_text = get_field('pu_tours_hero_button_2_text') ?: 'Meet the leaders';
  $hero_btn2_id   = get_field('pu_tours_hero_button_2_id') ?: 'meet-leaders-btn';

  // Output inline style for background image if it is set via ACF
  $hero_bg_style = $hero_bg_image ? 'style="background-image: url(\'' . esc_url($hero_bg_image) . '\'); background-size: cover; background-position: center;"' : '';
?>

<!-- Hero Section -->
<section class="pu-tours-hero-section text-center position-relative d-flex flex-column">
  
  <!-- Dynamic Background Image -->
  <div class="pu-tours-hero-bg position-absolute w-100 h-100" <?php echo $hero_bg_style; ?>></div>

  <div class="container pt-5 pb-2 order-1 pu-tours-hero-container">
    
    <?php if ( $hero_badge ) : ?>
    <!-- Badge -->
    <div class="mb-4 pt-4">
      <span class="badge rounded-pill bg-white text-dark py-2 px-4 shadow-sm pu-tours-custom-badge">
        <?php echo wp_kses_post( $hero_badge ); ?>
      </span>
    </div>
    <?php endif; ?>

    <?php if ( $hero_title ) : ?>
    <!-- Heading -->
    <h1 class="pu-tours-hero-title mb-4">
      <?php echo esc_html( $hero_title ); ?>
    </h1>
    <?php endif; ?>

    <?php if ( $hero_subtitle ) : ?>
    <!-- Subheading -->
    <p class="pu-tours-hero-subtitle mb-4 mx-auto px-3">
      <?php echo nl2br( esc_html( $hero_subtitle ) ); ?>
    </p>
    <?php endif; ?>

  </div>

  <div class="pu-tours-page-hero-buttons-container order-3 order-md-2 mb-md-1 mt-4 mt-md-0 z-3">
    <div class="container d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
      <!-- Button 1 -->
      <button type="button" id="<?php echo esc_attr( $hero_btn1_id ); ?>" class="btn pu-tours-btn-primary rounded-pill py-3 px-5 shadow">
        <?php echo esc_html( $hero_btn1_text ); ?>
      </button>
      
      <!-- Button 2 -->
      <button type="button" id="<?php echo esc_attr( $hero_btn2_id ); ?>" class="btn pu-tours-btn-outline rounded-pill py-3 px-5 shadow-sm bg-white">
        <?php echo esc_html( $hero_btn2_text ); ?>
      </button>
    </div>
  </div>
</section>
```

### ⚠️ Important CSS Note:
If you are loading the Hero Background Image using ACF, it will output an inline `style="background-image: ..."` tag on the `.pu-tours-hero-bg` div. Ensure that your `fix-scrolling.css` file doesn't use `!important` on the background image rule for `.pu-tours-hero-bg`, otherwise the ACF image won't show up.
