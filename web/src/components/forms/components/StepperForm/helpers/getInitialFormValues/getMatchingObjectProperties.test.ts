import { getMatchingObjectProperties } from "./getMatchingObjectProperties";

describe("getMatchingObjectProperties()", () => {
  test("Should return matching object properties", () => {
    const pagesConfig = {
      clientId: "",
      supplierId: "",
      product: "",
      supplierContractNumber: "",
    };

    const data = {
      supplierId: "",
      supplierContractNumber: "",
    };

    const matchingObjectProperties = getMatchingObjectProperties(
      pagesConfig,
      data
    );
    expect(matchingObjectProperties).toHaveLength(2);
  });
});
