function convertToCamelCase(results, fields) {
    return results.map(row => {
      const camelCaseRow = {};
      for (const [key, value] of Object.entries(row)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
        camelCaseRow[camelCaseKey] = value;
      }
      return camelCaseRow;
    });
}

module.exports={
    convertToCamelCase,
}