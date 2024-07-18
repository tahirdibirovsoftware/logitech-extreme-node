# Logitech Extreme Node

A Node.js library for interacting with the Logitech Extreme 3D Pro Joystick. This library allows you to easily access and interpret data from the joystick using an elegant API with asynchronous operations.

## Installation

```bash
npm install logitech-extreme-node
```

## Usage

```typescript
import { LogitechExtreme3DPro } from 'logitech-extreme-node';

(async () => {
  const joystick = new LogitechExtreme3DPro();
  await joystick.initialize();

  setInterval(() => {
    console.log('Roll:', joystick.getRoll());
    console.log('Pitch:', joystick.getPitch());
    console.log('Yaw:', joystick.getYaw());
    console.log('View:', joystick.getView());
    console.log('Throttle:', joystick.getThrottle());
    console.log('Buttons:', joystick.getButtons());
    console.log('All Controls:', joystick.getAllControls());
  }, 1000);
})();
```

## API

### `initialize(vendorId?: number, productId?: number): Promise<void>`

Initializes the connection to the joystick. Defaults to the Logitech Extreme 3D Pro Joystick's vendor ID (1133) and product ID (49685).

### `getRoll(): number`

Returns the roll value.

### `getPitch(): number`

Returns the pitch value.

### `getYaw(): number`

Returns the yaw value.

### `getView(): number`

Returns the view value.

### `getThrottle(): number`

Returns the throttle value.

### `getButtons(): number[]`

Returns an array representing the state of the buttons.

### `getAllControls(): Controls`

Returns an object containing all control values.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Tahir Dibirov
# logitech-extreme-node
