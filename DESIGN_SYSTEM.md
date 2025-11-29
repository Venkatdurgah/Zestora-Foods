# Zestora Foods - Design System

## Color Palette

### Primary Colors
- **Dark Green**: `#1a472a` - Main brand color for buttons, headers, text
- **Emerald**: `#10b981` - Hover states and accents
- **Gold**: `#D4AF37` - Premium accent color for special elements

### Secondary Colors
- **Cream**: `#FFF8F0` - Soft background for featured sections
- **White**: `#FFFFFF` - Main background
- **Gray 700**: `#374151` - Secondary text

## Typography

### Font Families
- **Serif (Premium)**: Playfair Display - Used for main headings, logo
- **Sans-serif (Clean)**: Inter - Used for body text, navigation

### Font Sizes & Weights

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| Page Title | 5xl/3rem | 700 Bold | Hero section main heading |
| Section Title | 4xl/2.25rem | 700 Bold | Main content sections |
| Card Title | lg/1.125rem | 600 | Product names |
| Body Text | base/1rem | 400 | Paragraphs, descriptions |
| Small Text | sm/0.875rem | 500 | Labels, captions |

## Component Styles

### Buttons

#### Primary Button (.btn-primary)
```
Background: Dark Green (#1a472a)
Text: White, uppercase, tracking-wide
Padding: px-6 py-3
Border: None, rounded-sm
Hover: Darker shade
Font: Semibold, text-sm
```

#### Secondary Button (.btn-secondary)
```
Background: Transparent
Text: Dark Green
Border: 2px solid Dark Green
Padding: px-6 py-3
Rounded: rounded-sm
Hover: Reverse colors (bg: Dark Green, text: White)
```

#### Outline Button (.btn-outline)
```
Background: Transparent
Text: Gray
Border: 1px solid gray-300
Padding: px-3 py-2
Rounded: rounded
Hover: Dark Green text and border
```

### Cards

#### Product Card
```
Background: White
Border: 1px solid gray-100
Shadow: md (hover: 2xl)
Border Radius: lg
Padding: p-4
Transitions: shadow, transform duration-300
```

#### Image Container
```
Height: 14rem (224px)
Background: Cream (#FFF8F0)
Overflow: Hidden with zoom on hover
Aspect: 16:9 (approx)
```

## Spacing System

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
base: 1rem (16px)
md: 1.5rem (24px)
lg: 2rem (32px)
xl: 3rem (48px)
2xl: 4rem (64px)
```

## Layout Patterns

### Max Width Container
- Desktop: 7xl (80rem / 1280px)
- Tablet: 6xl (64rem / 1024px)
- Mobile: Full width with px-4

### Grid Layouts
- Products: 3 columns (lg), 2 columns (md), 1 column (sm)
- Features: 4 columns (md), 1 column (sm)
- Footer: 4 columns (md), 1 column (sm)

## Hover & Interactive States

### Button Hover
- Scale: 1.05 (subtle)
- Brightness: Increase 5-10%
- Transition: 300ms ease-in-out

### Card Hover
- Shadow: Increase to 2xl
- Image: Scale 1.1 (zoom)
- Border: Subtle color change
- Transition: 300-500ms

### Link Hover
- Color: Change to gold or dark-green
- Underline: Optional
- Transition: 200-300ms

## Icons & Emojis

- Shopping Cart: 🛒
- Orders: 📦
- User: 👤
- Search: 🔍
- Home: 🏠
- Menu: ☰
- Check: ✓
- Close: ✕

## Shadows

- `shadow-sm`: Subtle, minimal depth
- `shadow-md`: Standard depth (cards, buttons)
- `shadow-lg`: Medium depth (hover states)
- `shadow-2xl`: Maximum depth (premium effect)

## Border Radius

- `rounded-sm`: 2px - Minimal rounding
- `rounded`: 4px - Standard
- `rounded-lg`: 8px - Cards and larger elements
- `rounded-full`: 9999px - Pills, circles

## Z-Index Layers

```
Header (sticky): z-50
Modals/Overlays: z-40
Dropdowns: z-30
Default: z-0
```

## Animation Speeds

- Fast: 150-200ms (micro-interactions)
- Standard: 300-400ms (buttons, hovers)
- Medium: 500-600ms (page transitions)
- Slow: 1000ms+ (hero animations)

## Responsive Breakpoints

- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md)
- Laptop: 1024px - 1280px (lg)
- Desktop: > 1280px (xl, 2xl)

## Accessibility

- Minimum contrast ratio: 4.5:1 (WCAG AA)
- Focus states: Visible outline (2px)
- Text size: Minimum 16px on mobile
- Touch targets: Minimum 44x44px

