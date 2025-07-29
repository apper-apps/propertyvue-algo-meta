class PropertyService {
  constructor() {
    this.tableName = 'property';
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(filters = {}) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "price" } },
          { field: { Name: "address" } },
          { field: { Name: "city" } },
          { field: { Name: "state" } },
          { field: { Name: "zipCode" } },
          { field: { Name: "bedrooms" } },
          { field: { Name: "bathrooms" } },
          { field: { Name: "squareFeet" } },
          { field: { Name: "propertyType" } },
          { field: { Name: "listingType" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "amenities" } },
          { field: { Name: "yearBuilt" } },
          { field: { Name: "latitude" } },
          { field: { Name: "longitude" } },
          { field: { Name: "isFavorite" } }
        ],
        where: [],
        orderBy: [
          {
            fieldName: "title",
            sorttype: "ASC"
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      // Apply filters
      if (filters.location) {
        params.whereGroups = [{
          operator: "OR",
          subGroups: [
            {
              conditions: [{
                fieldName: "city",
                operator: "Contains",
                values: [filters.location]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "state",
                operator: "Contains",
                values: [filters.location]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "address",
                operator: "Contains",
                values: [filters.location]
              }],
              operator: "OR"
            }
          ]
        }];
      }

      if (filters.minPrice) {
        params.where.push({
          FieldName: "price",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.minPrice]
        });
      }

      if (filters.maxPrice) {
        params.where.push({
          FieldName: "price",
          Operator: "LessThanOrEqualTo",
          Values: [filters.maxPrice]
        });
      }

      if (filters.minBeds) {
        params.where.push({
          FieldName: "bedrooms",
          Operator: "GreaterThanOrEqualTo",
          Values: [filters.minBeds]
        });
      }

      if (filters.maxBeds) {
        params.where.push({
          FieldName: "bedrooms",
          Operator: "LessThanOrEqualTo",
          Values: [filters.maxBeds]
        });
      }

      if (filters.propertyType && filters.propertyType.length > 0) {
        params.where.push({
          FieldName: "propertyType",
          Operator: "ExactMatch",
          Values: filters.propertyType
        });
      }

      if (filters.amenities && filters.amenities.length > 0) {
        params.where.push({
          FieldName: "amenities",
          Operator: "Contains",
          Values: filters.amenities
        });
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching properties:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching properties:", error.message);
        throw error;
      }
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "price" } },
          { field: { Name: "address" } },
          { field: { Name: "city" } },
          { field: { Name: "state" } },
          { field: { Name: "zipCode" } },
          { field: { Name: "bedrooms" } },
          { field: { Name: "bathrooms" } },
          { field: { Name: "squareFeet" } },
          { field: { Name: "propertyType" } },
          { field: { Name: "listingType" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "amenities" } },
          { field: { Name: "yearBuilt" } },
          { field: { Name: "latitude" } },
          { field: { Name: "longitude" } },
          { field: { Name: "isFavorite" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching property with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching property with ID ${id}:`, error.message);
      }
      return null;
    }
  }

  async getFavorites() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "price" } },
          { field: { Name: "address" } },
          { field: { Name: "city" } },
          { field: { Name: "state" } },
          { field: { Name: "zipCode" } },
          { field: { Name: "bedrooms" } },
          { field: { Name: "bathrooms" } },
          { field: { Name: "squareFeet" } },
          { field: { Name: "propertyType" } },
          { field: { Name: "listingType" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "amenities" } },
          { field: { Name: "yearBuilt" } },
          { field: { Name: "latitude" } },
          { field: { Name: "longitude" } },
          { field: { Name: "isFavorite" } }
        ],
        where: [{
          FieldName: "isFavorite",
          Operator: "ExactMatch",
          Values: [true]
        }],
        orderBy: [{
          fieldName: "title",
          sorttype: "ASC"
        }]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching favorite properties:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching favorite properties:", error.message);
        throw error;
      }
    }
  }

  async toggleFavorite(propertyId) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      // First get current property to toggle favorite status
      const currentProperty = await this.getById(propertyId);
      if (!currentProperty) {
        throw new Error("Property not found");
      }

      const newFavoriteStatus = !currentProperty.isFavorite;
      
      const params = {
        records: [{
          Id: parseInt(propertyId),
          isFavorite: newFavoriteStatus
        }]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to toggle favorite for property ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        const successfulUpdate = response.results.find(result => result.success);
        return successfulUpdate ? successfulUpdate.data : { ...currentProperty, isFavorite: newFavoriteStatus };
      }

      return { ...currentProperty, isFavorite: newFavoriteStatus };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling favorite:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error toggling favorite:", error.message);
        throw error;
      }
    }
  }

  async search(query) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "price" } },
          { field: { Name: "address" } },
          { field: { Name: "city" } },
          { field: { Name: "state" } },
          { field: { Name: "zipCode" } },
          { field: { Name: "bedrooms" } },
          { field: { Name: "bathrooms" } },
          { field: { Name: "squareFeet" } },
          { field: { Name: "propertyType" } },
          { field: { Name: "listingType" } },
          { field: { Name: "images" } },
          { field: { Name: "description" } },
          { field: { Name: "amenities" } },
          { field: { Name: "yearBuilt" } },
          { field: { Name: "latitude" } },
          { field: { Name: "longitude" } },
          { field: { Name: "isFavorite" } }
        ],
        whereGroups: [{
          operator: "OR",
          subGroups: [
            {
              conditions: [{
                fieldName: "title",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "city",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "state",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "address",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            },
            {
              conditions: [{
                fieldName: "description",
                operator: "Contains",
                values: [query]
              }],
              operator: "OR"
            }
          ]
        }],
        orderBy: [{
          fieldName: "title",
          sorttype: "ASC"
        }]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching properties:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error searching properties:", error.message);
        throw error;
      }
    }
  }

  async getPropertyTypes() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "propertyType" } }
        ],
        groupBy: ["propertyType"]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      const types = (response.data || [])
        .map(item => item.propertyType)
        .filter(type => type && type.trim() !== "");
      
      return [...new Set(types)];
    } catch (error) {
      console.error("Error fetching property types:", error.message);
      return [];
    }
  }

  async getAllAmenities() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "amenities" } }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      const allAmenities = (response.data || [])
        .filter(item => item.amenities)
        .flatMap(item => {
          if (typeof item.amenities === 'string') {
            return item.amenities.split(',').map(a => a.trim());
          }
          return Array.isArray(item.amenities) ? item.amenities : [];
        })
        .filter(amenity => amenity && amenity.trim() !== "");
      
      return [...new Set(allAmenities)].sort();
    } catch (error) {
      console.error("Error fetching amenities:", error.message);
      return [];
    }
  }

  async getPriceRange() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "price" } }
        ],
        orderBy: [
          { fieldName: "price", sorttype: "ASC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return { min: 0, max: 1000000 };
      }

      const prices = (response.data || [])
        .map(item => parseFloat(item.price))
        .filter(price => !isNaN(price));
      
      if (prices.length === 0) {
        return { min: 0, max: 1000000 };
      }
      
      return {
        min: Math.min(...prices),
        max: Math.max(...prices)
      };
    } catch (error) {
      console.error("Error fetching price range:", error.message);
      return { min: 0, max: 1000000 };
    }
  }
}

export default new PropertyService();