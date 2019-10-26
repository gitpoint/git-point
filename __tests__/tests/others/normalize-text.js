import * as screens from 'testData/screens';

const mockClassWithGetter = value => ({
  get: jest.fn().mockReturnValue(value),
});

const mockRequiredClasses = mockValues => {
  jest.mock('Dimensions', () => mockClassWithGetter(mockValues.dimensions));
  jest.mock('PixelRatio', () => mockClassWithGetter(mockValues.pixelRatio));
};

const expectSize = size => {
  jest.isolateModules(() => {
    const { normalize } = require('config');
    expect(normalize(1)).toEqual(size);
  });
};

describe('Normalize Text', () => {
  // iOS Devices

  it('should normalize correctly on iPhone 5', () => {
    mockRequiredClasses({ dimensions: screens.iPhone5, pixelRatio: 2 });

    expectSize(0.95);
  });

  it('should normalize correctly on iPhone 6', () => {
    mockRequiredClasses({ dimensions: screens.iPhone6, pixelRatio: 2 });

    expectSize(1.15);
  });

  it('should normalize correctly on iPhone 6 Plus', () => {
    mockRequiredClasses({ dimensions: screens.iPhone6Plus, pixelRatio: 3 });

    expectSize(1.27);
  });

  it('should normalize correctly on iPhone 7', () => {
    mockRequiredClasses({ dimensions: screens.iPhone7, pixelRatio: 2 });

    expectSize(1.15);
  });

  it('should normalize correctly on iPhone 7 Plus', () => {
    mockRequiredClasses({ dimensions: screens.iPhone7Plus, pixelRatio: 3 });

    expectSize(1.27);
  });

  it('should normalize correctly on iPod Touch', () => {
    mockRequiredClasses({ dimensions: screens.iPodTouch, pixelRatio: 2 });

    expectSize(0.95);
  });

  it('should normalize correctly on iPad Pro', () => {
    mockRequiredClasses({ dimensions: screens.iPadPro, pixelRatio: 2 });

    expectSize(1.25);
  });

  it('should normalize correctly on iPad Gen 3/4', () => {
    mockRequiredClasses({ dimensions: screens.iPadGen3, pixelRatio: 2 });

    expectSize(1.25);
  });

  it('should normalize correctly on iPad Air', () => {
    mockRequiredClasses({ dimensions: screens.iPadAir, pixelRatio: 2 });

    expectSize(1.25);
  });

  it('should normalize correctly on iPad Mini', () => {
    mockRequiredClasses({ dimensions: screens.iPadMini, pixelRatio: 1 });

    expectSize(1);
  });

  // Android Devices

  it('should normalize correctly on Nexus 6P', () => {
    mockRequiredClasses({ dimensions: screens.Nexus6P, pixelRatio: 3.5 });

    expectSize(1.25);
  });

  it('should normalize correctly on Nexus 5X', () => {
    mockRequiredClasses({ dimensions: screens.Nexus5X, pixelRatio: 2.6 });

    expectSize(1.15);
  });

  it('should normalize correctly on Google Pixel', () => {
    mockRequiredClasses({ dimensions: screens.GooglePixel, pixelRatio: 2.6 });

    expectSize(1.15);
  });

  it('should normalize correctly on Google Pixel XL', () => {
    mockRequiredClasses({ dimensions: screens.GooglePixelXL, pixelRatio: 3.5 });

    expectSize(1.25);
  });

  it('should normalize correctly on Samsung Galaxy Note 5', () => {
    mockRequiredClasses({
      dimensions: screens.SamsungGalaxyNote5,
      pixelRatio: 4,
    });

    expectSize(1);
  });

  it('should normalize correctly on Samsung Galaxy S7', () => {
    mockRequiredClasses({ dimensions: screens.SamsungGalaxyS7, pixelRatio: 4 });

    expectSize(1);
  });

  it('should normalize correctly on Samsung Galaxy S7 Edge', () => {
    mockRequiredClasses({
      dimensions: screens.SamsungGalaxyS7Edge,
      pixelRatio: 4,
    });

    expectSize(1);
  });

  it('should normalize correctly on LG G5', () => {
    mockRequiredClasses({ dimensions: screens.LGG5, pixelRatio: 4 });

    expectSize(1);
  });

  it('should normalize correctly on OnePlus 3', () => {
    mockRequiredClasses({ dimensions: screens.OnePlus3, pixelRatio: 3 });

    expectSize(1);
  });

  it('should normalize correctly on Nexus 7', () => {
    mockRequiredClasses({ dimensions: screens.Nexus7, pixelRatio: 2 });

    expectSize(1.25);
  });

  it('should normalize correctly on Nexus 9', () => {
    mockRequiredClasses({ dimensions: screens.Nexus9, pixelRatio: 2 });

    expectSize(1.25);
  });

  it('should normalize correctly on Samsung Galaxy Tab 10', () => {
    mockRequiredClasses({
      dimensions: screens.SamsungGalaxyTab10,
      pixelRatio: 1,
    });

    expectSize(1);
  });

  it('should normalize correctly on ChromebookPixel', () => {
    mockRequiredClasses({ dimensions: screens.ChromebookPixel, pixelRatio: 2 });

    expectSize(1.25);
  });
});
