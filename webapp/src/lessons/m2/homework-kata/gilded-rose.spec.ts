import { Item, GildedRose } from "./gilded-rose";

describe("Gilded Rose", function () {
  it("normal item should decrease sell in days by 1 after update", () => {
    const gildedRose = new GildedRose([new Item("normalItem", 10, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(9);
  });

  it("normal item should decrease quality by 1 after update when more than 10 days to sell in", () => {
    const gildedRose = new GildedRose([new Item("normalItem", 10, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });

  it("normal item should decrease quality by 2 after when sell in days passed", () => {
    const gildedRose = new GildedRose([new Item("normalItem", 0, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  });

  it("The quality of an item is never negative", () => {
    const gildedRose = new GildedRose([new Item("normalItem", -3, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("Aged Brie increased quality every day", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 3, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  });

  it("Aged Brie increased quality twice every day when sell in passed", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -3, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });

  it("The quality of an item is never more than 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -3, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("Sulfuras, Hand of Ragnaros never changes", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 3, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });

  it("Backstage passes increases in quality by 2 when more or less than 10 days and more than 5", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 12),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(14);
  });

  it("Backstage passes increases in quality by 3 when more or less than 5 days", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 12),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(15);
  });

  it("Backstage passes drops quality to zero when no sold", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 12),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("Conjured Mana Cake decreases twice as normal item", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 10, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  });

  it("Conjured Mana Cake decreases twice as normal item alse when sell in passed", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", -1, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);
  });
});
