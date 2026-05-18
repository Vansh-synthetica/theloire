## Restructure Catalog: 3 Size Tiers with Color Options

### New product catalog
Replace the 8 existing products with 3 size-based bags, each offering 4 colors (Ivory, Sand, Champagne, Caramel):

- **Petite Crochet Bag** — Small — ₱400
- **Classique Crochet Bag** — Medium — ₱450
- **Grande Crochet Bag** — Large — ₱500

### Changes

**`src/lib/products.ts`**
- Extend `Product` type with `colors: { name: string; image: string }[]` and replace `price: number` formatting upstream (keep numeric, format in UI).
- Replace `products` array with the 3 entries above. Map existing images to colors:
  - Ivory → `bag-ivory.jpg`
  - Sand → `bag-sand.jpg`
  - Champagne → `bag-bucket.jpg`
  - Caramel → `product-mini.jpg`
- Each size uses the same 4 color images (image variant differs per color, not per size); primary `image` defaults to Ivory.
- Update `category` to "Small" / "Medium" / "Large".

**Currency formatting**
- Add `formatPHP(n)` helper returning `₱{n}` (e.g. `₱400`).
- Replace every `€{...}` occurrence with `₱{...}` across:
  - `src/components/ProductCard.tsx`
  - `src/routes/product.$id.tsx`
  - `src/routes/cart.tsx`
  - `src/routes/checkout.tsx`
  - `src/routes/index.tsx` (any price rendering)
  - `src/lib/cart.tsx` (`buildOrderMailto` body lines and total)
  - Checkout payload `estimated_total` → `₱{total}`

**`src/routes/product.$id.tsx`**
- Add color selector (4 swatches/labels). Selecting a color swaps the displayed image and stores chosen color.
- When adding to cart, include color in the cart item.

**`src/lib/cart.tsx`**
- Add optional `color?: string` to `CartItem`; treat same product + different color as separate cart lines (key by `id + color`).
- Update `add()` to dedupe on `id+color` instead of `id` only.
- Include color in mailto body and Web3Forms `product_summary`.

**`src/routes/cart.tsx` & `src/routes/checkout.tsx`**
- Show selected color under item name.
- Use color-keyed identity for remove/quantity updates.

**`src/routes/shop.tsx`**
- Update category filter list to: `["All", "Small", "Medium", "Large"]`.

**`src/routes/index.tsx`**
- Update any hardcoded featured products to reference the 3 new IDs (`petite`, `classique`, `grande`).

### Out of scope
- No new image generation — reuse existing 4 bag images as color variants.
- No design system / layout changes beyond the color swatch UI on PDP.
