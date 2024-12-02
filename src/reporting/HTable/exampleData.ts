import { HTableConfig } from "./HTable";

// Example object conforming to HTableConfig
export const exampleHTableConfig: HTableConfig = {
  props: {
    headerStyle: {
      padding: "8px 0",
      "background-color": "rgb(52, 40, 78)",
      color: "white",
    },
    categoryGroupStyle: {
      padding: "8px 0",
      "margin-bottom": "4px",
      "background-color": "rgb(52, 40, 78)",
      color: "white",
    },
    rowStyle: {
      padding: "4px 0",
      fontSize: "13px",
      borderBottom: "none",
      lineHeight: "1.3",
    },
    columnConfig: [
      {
        name: "Name",
        colSpan: 2,
        colOrder: 1,
        alignment: "left",
        contentAlignment: "left",
      },
      {
        name: "Price",
        colSpan: 0.5,
        colOrder: 2,
        alignment: "center",
        contentAlignment: "center",
      },
      {
        name: "Status",
        colSpan: 0.5,
        colOrder: 3,
        alignment: "center",
        contentAlignment: "center",
      },
      {
        name: "Description",
        colOrder: 4,
        alignment: "center",
        contentAlignment: "left",
      },
      {
        name: "Quantity",
        colSpan: 0.5,
        colOrder: 5,
        alignment: "center",
        contentAlignment: "center",
      },
    ],
  },
  data: {
    hierarchy: {
      Electronics: {
        left: "Electronics",
        right: "200", // Sum of computer and phone quantities (25+15+45+35+50+30)
        children: {
          COMPUTERS: {
            left: "Computers",
            right: "120", // Sum of laptop and desktop quantities
            children: {
              LAPTOPS: {
                left: "Laptops",
                right: "40", // Sum of quantities (25+15)
              },
              DESKTOPS: {
                left: "Desktops",
                right: "80", // Sum of quantities (45+35)
              },
            },
          },
          PHONES: {
            left: "Phones",
            right: "80", // Sum of quantities (50+30)
          },
        },
      },
      Clothing: {
        left: "Clothing",
        right: "350", // Sum of shirts, pants, shoes quantities (100+75+60+45+40+30)
        children: {
          SHIRTS: {
            left: "Shirts",
            right: "175", // Sum of quantities (100+75)
          },
          PANTS: {
            left: "Pants",
            right: "105", // Sum of quantities (60+45)
          },
          SHOES: {
            left: "Shoes",
            right: "70", // Sum of quantities (40+30)
          },
        },
      },
      Books: {
        left: "Books",
        right: "560", // Sum of fiction and nonfiction quantities (200+150+120+90)
        children: {
          FICTION: {
            left: "Fiction",
            right: "350", // Sum of quantities (200+150)
          },
          NONFICTION: {
            left: "NonFiction",
            right: "210", // Sum of quantities (120+90)
          },
        },
      },
      Food: {
        left: "Food",
        right: "2500", // Sum of fruits, vegetables, grains quantities (500+400+600+450+300+250)
        children: {
          FRUITS: {
            left: "Fruits",
            right: "900", // Sum of quantities (500+400)
          },
          VEGETABLES: {
            left: "Vegetables",
            right: "1050", // Sum of quantities (600+450)
          },
          GRAINS: {
            left: "Grains",
            right: "550", // Sum of quantities (300+250)
          },
        },
      },
    },
    data: [
      {
        rowId: "phone1",
        categoryId: "PHONES",
        columnData: {
          Name: "iPhone 13 Pro",
          Price: "$999",
          Quantity: "50",
          Status: "In Stock",
          Description:
            "<ul style='padding-left: 0; margin-left: 16px'><li>Latest model smartphone with 5G capability</li><li>Advanced camera system with night mode</li><li>All-day battery life</li><li>Water resistance rating IP68</li></ul>",
        },
      },
      {
        rowId: "phone2",
        categoryId: "PHONES",
        columnData: {
          Name: "Samsung Galaxy S21",
          Price: "$899",
          Quantity: "30",
          Status: "Low Stock",
          Description:
            "<p>Mid-range smartphone featuring excellent performance metrics and expanded storage capacity. Includes wireless charging capabilities and innovative dual SIM support for enhanced connectivity options.</p>",
        },
      },
      {
        rowId: "laptop1",
        categoryId: "LAPTOPS",
        columnData: {
          Name: "Dell XPS 15",
          Price: "$1299",
          Quantity: "25",
          Status: "In Stock",
          Description:
            "Professional-grade laptop engineered for demanding workloads. Features dedicated graphics processing and substantial memory allocation, making it ideal for content creation and gaming applications.",
        },
      },
      {
        rowId: "laptop2",
        categoryId: "LAPTOPS",
        columnData: {
          Name: "MacBook Pro 16",
          Price: "$1499",
          Quantity: "15",
          Status: "In Stock",
          Description:
            "<ul style='padding-left: 0; margin-left: 16px'><li>Premium ultrabook with 4K display</li><li>Intel i9 processor</li><li>Dual Thunderbolt ports</li><li>Integrated fingerprint security</li><li>Machined aluminum chassis</li></ul>",
        },
      },
      {
        rowId: "desktop1",
        categoryId: "DESKTOPS",
        columnData: {
          Name: "Gaming PC Pro",
          Price: "$1899",
          Quantity: "45",
          Status: "In Stock",
          Description:
            "<ul style='padding-left: 0; margin-left: 16px'><li>RTX 4080 Graphics</li><li>32GB DDR5 RAM</li><li>2TB NVMe SSD</li><li>RGB Lighting</li><li>Liquid Cooling</li></ul>",
        },
      },
      {
        rowId: "desktop2",
        categoryId: "DESKTOPS",
        columnData: {
          Name: "iMac 27",
          Price: "$1699",
          Quantity: "35",
          Status: "In Stock",
          Description:
            "<p>All-in-one desktop computer featuring 5K Retina display and M1 chip. Includes color-matched accessories and enhanced webcam for remote work capabilities.</p>",
        },
      },
      {
        rowId: "shirt1",
        categoryId: "SHIRTS",
        columnData: {
          Name: "Classic Oxford Shirt",
          Price: "$29.99",
          Quantity: "100",
          Status: "In Stock",
          Description:
            "<p>Versatile cotton blend casual shirt designed for modern lifestyles. Features wrinkle-resistant fabric technology and precision stitching for enhanced durability.</p>",
        },
      },
      {
        rowId: "shirt2",
        categoryId: "SHIRTS",
        columnData: {
          Name: "Premium Dress Shirt",
          Price: "$34.99",
          Quantity: "75",
          Status: "In Stock",
          Description:
            "<ul style='padding-left: 0; margin-left: 16px'><li>Premium Egyptian cotton dress shirt</li><li>Mother-of-pearl buttons</li><li>French cuff design</li><li>Tailored fit</li></ul>",
        },
      },
      {
        rowId: "pants1",
        categoryId: "PANTS",
        columnData: {
          Name: "Modern Fit Chinos",
          Price: "$49.99",
          Quantity: "60",
          Status: "In Stock",
          Description:
            "Contemporary chinos crafted with stretch fabric technology. Incorporates multiple functional pockets and modern slim fit design for versatile everyday wear.",
        },
      },
      {
        rowId: "pants2",
        categoryId: "PANTS",
        columnData: {
          Name: "Wool Dress Pants",
          Price: "$59.99",
          Quantity: "45",
          Status: "In Stock",
          Description:
            "<p>Professional dress pants featuring premium wool blend construction. Includes innovative hidden expandable waistband for optimal comfort during long workdays.</p>",
        },
      },
      {
        rowId: "shoes1",
        categoryId: "SHOES",
        columnData: {
          Name: "Performance Runners",
          Price: "$79.99",
          Quantity: "40",
          Status: "In Stock",
          Description:
            "<ul style='padding-left: 0; margin-left: 16px'><li>Performance running shoes</li><li>Responsive cushioning system</li><li>Breathable mesh upper</li><li>Reflective safety details</li><li>Custom insole support</li></ul>",
        },
      },
      {
        rowId: "shoes2",
        categoryId: "SHOES",
        columnData: {
          Name: "Classic Oxford Shoes",
          Price: "$89.99",
          Quantity: "30",
          Status: "Low Stock",
          Description:
            "Premium leather dress shoes featuring traditional Goodyear welt construction. Includes complementary cedar shoe trees for optimal shape retention and moisture management.",
        },
      },
      {
        rowId: "fiction1",
        categoryId: "FICTION",
        columnData: {
          Name: "The Silent Echo",
          Price: "$14.99",
          Quantity: "200",
          Status: "In Stock",
          Description:
            "<p>Gripping mystery novel that launches an exciting new series. Written by an award-winning author, this page-turner combines intricate plot twists with compelling character development.</p>",
        },
      },
      {
        rowId: "fiction2",
        categoryId: "FICTION",
        columnData: {
          Name: "Summer Hearts",
          Price: "$12.99",
          Quantity: "150",
          Status: "In Stock",
          Description:
            "<ul style='padding-left: 0; margin-left: 16px'><li>Contemporary romance paperback</li><li>Featuring deckled page edges</li><li>Includes exclusive bonus epilogue</li><li>Author-signed bookplate</li></ul>",
        },
      },
      {
        rowId: "nonfiction1",
        categoryId: "NONFICTION",
        columnData: {
          Name: "Smart Money Moves",
          Price: "$24.99",
          Quantity: "120",
          Status: "In Stock",
          Description:
            "Definitive guide to personal finance and investment strategies. Includes complimentary access to online resources, worksheets, and regular market updates.",
        },
      },
      {
        rowId: "nonfiction2",
        categoryId: "NONFICTION",
        columnData: {
          Name: "The Hidden Years",
          Price: "$19.99",
          Quantity: "90",
          Status: "In Stock",
          Description:
            "<p>Meticulously researched historical biography featuring previously unpublished photographs. Based on extensive primary source documentation and exclusive interviews.</p>",
        },
      },
      {
        rowId: "fruit1",
        categoryId: "FRUITS",
        columnData: {
          Name: "Mixed Berry Pack",
          Price: "$1.99",
          Quantity: "500",
          Status: "In Stock",
          Description:
            "<ul style='padding-left: 0; margin-left: 16px'><li>Organic seasonal berries</li><li>Locally sourced from family farms</li><li>Peak ripeness harvesting</li><li>No pesticides used</li></ul>",
        },
      },
      {
        rowId: "fruit2",
        categoryId: "FRUITS",
        columnData: {
          Name: "Tropical Fruit Mix",
          Price: "$2.99",
          Quantity: "400",
          Status: "In Stock",
          Description:
            "Curated selection of tropical fruits sourced from sustainable farming operations. Perfect for creating nutritious smoothies and vibrant fruit salads.",
        },
      },
      {
        rowId: "veg1",
        categoryId: "VEGETABLES",
        columnData: {
          Name: "Premium Salad Mix",
          Price: "$0.99",
          Quantity: "600",
          Status: "In Stock",
          Description:
            "<p>Premium leafy greens cultivated in state-of-the-art hydroponic facilities. Undergoes thorough triple-wash process ensuring ready-to-eat convenience.</p>",
        },
      },
      {
        rowId: "veg2",
        categoryId: "VEGETABLES",
        columnData: {
          Name: "Root Vegetable Pack",
          Price: "$1.49",
          Quantity: "450",
          Status: "In Stock",
          Description:
            "<ul style='padding-left: 0; margin-left: 16px'><li>Organic root vegetables</li><li>Rich in essential nutrients</li><li>Harvested at peak freshness</li><li>Certified organic farming</li></ul>",
        },
      },
      {
        rowId: "grain1",
        categoryId: "GRAINS",
        columnData: {
          Name: "Ancient Grain Blend",
          Price: "$3.99",
          Quantity: "300",
          Status: "In Stock",
          Description:
            "Nutritious ancient grain blend combining quinoa, amaranth, and other heritage varieties. Provides exceptional protein content and dietary fiber benefits.",
        },
      },
      {
        rowId: "grain2",
        categoryId: "GRAINS",
        columnData: {
          Name: "Artisanal Pasta",
          Price: "$4.99",
          Quantity: "250",
          Status: "In Stock",
          Description:
            "<p>Artisanal pasta crafted from heritage wheat varieties using traditional methods. Bronze-die extrusion creates optimal texture for sauce adherence.</p>",
        },
      },
    ],
  },
};
