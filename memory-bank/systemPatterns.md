# System Patterns: Roro's Adventure

## Architecture Overview
The game follows a scene-based architecture typical of Unity games, with clear separation of concerns across different components.

## Core System Components

1. **Scene Management System**
   ```
   Menu (0) -> Story (1) -> Stages (2-11) -> Future Content (99)
   ```
   - Linear progression through numbered scenes
   - Each stage is isolated in its own scene
   - Consistent stage loading pattern

2. **Script Organization**
   ```
   Core Systems:
   - BeforeAll.js: Initial setup/configuration
   - GameStart.js: Game initialization
   - AutoType.js: Text animation system
   - TextSpark.js: Text effects
   - DLC.js: Additional content handling
   
   Stage Controllers:
   - Stage1.js through Stage10.js
   - EndScene.js and EndStory.js
   ```

3. **Animation Framework**
   ```
   Hierarchical Structure:
   /Animations
   ├── Background/
   ├── Enemy/
   ├── Menu/
   └── Player/
   ```

## Design Patterns

1. **Component Pattern**
   - Prefab-based composition (_MainCtrler, BgAnim, Chatbox, RORO)
   - Modular script attachment
   - Reusable component architecture

2. **State Management**
   - Character state system (animations, transformations)
   - Scene state tracking
   - Game progression state

3. **Event System**
   - Chat/dialogue event handling
   - Animation event coordination
   - Stage progression events

4. **Resource Management**
   ```
   Asset Organization:
   /Textures - Sprite assets
   /Fonts - Typography resources
   /Prefabs - Reusable game objects
   /Scenes - Stage definitions
   ```

## Technical Patterns

1. **Animation Control**
   - ChgAnim.js handles animation state changes
   - Background animation system (BgAnim prefab)
   - Character transformation animations

2. **UI Framework**
   - Chatbox system for dialogue
   - Menu system for navigation
   - Text animation system for dynamic content

3. **Stage Implementation Pattern**
   ```javascript
   Stage Structure:
   - Initialization
   - Event handling
   - State management
   - Scene progression
   ```

## Integration Patterns

1. **Prefab Integration**
   - _MainCtrler: Core game controller
   - BgAnim: Background animation system
   - Chatbox: Dialog system
   - RORO: Player character system

2. **Asset Integration**
   - Consistent naming conventions
   - Organized asset hierarchy
   - Clear separation of concerns

3. **Scene Integration**
   - Standardized scene numbering
   - Consistent object hierarchy
   - Reusable prefab instances

## Development Patterns

1. **Naming Conventions**
   - Numbered scenes for clear progression
   - Descriptive script names
   - Organized asset structure

2. **Code Organization**
   - Functionality-based script separation
   - Clear script responsibilities
   - Consistent implementation patterns

3. **Asset Management**
   - Sprite-based character system
   - Animation state management
   - Resource optimization
