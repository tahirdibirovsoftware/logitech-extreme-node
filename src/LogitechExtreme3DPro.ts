import HID from 'node-hid';

interface Controls {
  roll: number;
  pitch: number;
  yaw: number;
  view: number;
  throttle: number;
  buttons: number[];
}

class LogitechExtreme3DPro {
  private device: HID.HIDAsync | null = null;
  private controls: Controls = {
    roll: 0,
    pitch: 0,
    yaw: 0,
    view: 0,
    throttle: 0,
    buttons: Array(12).fill(0)
  };

  async initialize(vendorId: number = 1133, productId: number = 49685): Promise<void> {
    try {
      this.device = await HID.HIDAsync.open(vendorId, productId);
      this.device.on('data', this.parseData.bind(this));
      this.device.on('error', this.handleError);
    } catch (error) {
      console.error('Failed to initialize the device:', error);
    }
  }

  private parseData(data: Buffer) {
    const ch = data.toString('hex').match(/.{1,2}/g)!.map((c) => parseInt(c, 16));

    this.controls.roll = ((ch[1] & 0x03) << 8) + ch[0];
    this.controls.pitch = ((ch[2] & 0x0f) << 6) + ((ch[1] & 0xfc) >> 2);
    this.controls.yaw = ch[3];
    this.controls.view = (ch[2] & 0xf0) >> 4;
    this.controls.throttle = -ch[5] + 255;
    this.controls.buttons = [
      (ch[4] & 0x01) >> 0,
      (ch[4] & 0x02) >> 1,
      (ch[4] & 0x04) >> 2,
      (ch[4] & 0x08) >> 3,
      (ch[4] & 0x10) >> 4,
      (ch[4] & 0x20) >> 5,
      (ch[4] & 0x40) >> 6,
      (ch[4] & 0x80) >> 7,
      (ch[6] & 0x01) >> 0,
      (ch[6] & 0x02) >> 1,
      (ch[6] & 0x04) >> 2,
      (ch[6] & 0x08) >> 3
    ];
  }

  private handleError(error: Error) {
    console.error('Device error:', error);
  }

  getRoll(): number {
    return this.controls.roll;
  }

  getPitch(): number {
    return this.controls.pitch;
  }

  getYaw(): number {
    return this.controls.yaw;
  }

  getView(): number {
    return this.controls.view;
  }

  getThrottle(): number {
    return this.controls.throttle;
  }

  getButtons(): number[] {
    return this.controls.buttons;
  }

  getAllControls(): Controls {
    return this.controls;
  }
}

export { LogitechExtreme3DPro, Controls };
