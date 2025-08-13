import { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useActionData, Form, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  TextField,
  Banner,
  Text,
  BlockStack,
  InlineGrid,
  Box,
  Divider,
  Badge,
  ButtonGroup,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  
  // Check if Dropbox is connected for this shop
  // In a real app, you'd check your database for stored tokens
  const dropboxConnected = false; // This would be dynamic
  
  return json({
    shop: session.shop,
    dropboxConnected,
  });
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "calculate":
      // Handle quote calculation
      const width = parseFloat(formData.get("width") || 0);
      const height = parseFloat(formData.get("height") || 0);
      const quantity = parseInt(formData.get("quantity") || 0);
      const productCost = parseFloat(formData.get("productCost") || 2.86);
      const pressCost = parseFloat(formData.get("pressCost") || 1.75);
      const markup = parseFloat(formData.get("markup") || 50);
      
      if (width <= 0 || height <= 0 || quantity <= 0) {
        return json({ 
          error: "Please enter valid dimensions and quantity",
          type: "calculate" 
        });
      }
      
      // Calculate costs (simplified version of your logic)
      const area = width * height;
      const totalArea = area * quantity;
      const costPerSqIn = 0.50; // Linear inch cost
      const imprintCost = totalArea * costPerSqIn;
      const totalProductCost = productCost * quantity;
      const totalPressCost = pressCost * quantity;
      const totalCost = imprintCost + totalProductCost + totalPressCost;
      const unitCost = totalCost / quantity;
      const retailUnit = unitCost * (1 + markup / 100);
      const retailTotal = retailUnit * quantity;
      const totalProfit = retailTotal - totalCost;
      
      return json({
        success: true,
        type: "calculate",
        results: {
          area: area.toFixed(2),
          totalArea: totalArea.toFixed(2),
          imprintCost: imprintCost.toFixed(2),
          totalProductCost: totalProductCost.toFixed(2),
          totalPressCost: totalPressCost.toFixed(2),
          totalCost: totalCost.toFixed(2),
          unitCost: unitCost.toFixed(2),
          retailUnit: retailUnit.toFixed(2),
          retailTotal: retailTotal.toFixed(2),
          totalProfit: totalProfit.toFixed(2),
        }
      });
      
    case "save_quote":
      // Handle quote saving to Dropbox
      const quoteData = JSON.parse(formData.get("quoteData"));
      const quoteName = formData.get("quoteName") || "DTF Quote";
      
      // Here you would save to Dropbox using your OAuth tokens
      // For now, we'll simulate success
      
      return json({
        success: true,
        type: "save_quote",
        message: "Quote saved to Dropbox successfully!"
      });
      
    default:
      return json({ error: "Invalid action" });
  }
};

export default function DTFTool() {
  const { shop, dropboxConnected } = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  
  // Form states
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productCost, setProductCost] = useState("2.86");
  const [pressCost, setPressCost] = useState("1.75");
  const [markup, setMarkup] = useState("50");
  const [quoteName, setQuoteName] = useState("");
  
  // Results state
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Update results when action data changes
  useEffect(() => {
    if (actionData?.type === "calculate" && actionData?.results) {
      setResults(actionData.results);
      setLoading(false);
    }
  }, [actionData]);

  const connectDropbox = () => {
    // In a real app, this would redirect to Dropbox OAuth
    window.open("/dropbox/auth", "_blank", "width=500,height=600");
  };

  return (
    <Page
      title="DTF Reseller Tool"
      subtitle="Calculate profits and save quotes to Dropbox"
      primaryAction={dropboxConnected ? null : {
        content: "Connect Dropbox",
        onAction: connectDropbox,
      }}
    >
      <Layout>
        {/* Connection Status */}
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd">Connection Status</Text>
              <Box>
                {dropboxConnected ? (
                  <Badge tone="success">✅ Dropbox Connected</Badge>
                ) : (
                  <Badge tone="critical">❌ Dropbox Not Connected</Badge>
                )}
              </Box>
              {dropboxConnected ? (
                <Text variant="bodyMd" color="success">
                  Your quotes will be saved automatically with persistent tokens.
                </Text>
              ) : (
                <BlockStack gap="200">
                  <Text variant="bodyMd">
                    Connect Dropbox to enable quote saving with permanent access tokens.
                  </Text>
                  <Button onClick={connectDropbox} variant="primary">
                    Connect Dropbox
                  </Button>
                </BlockStack>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>

        {/* Calculator */}
        <Layout.Section variant="twoThirds">
          <Form method="post">
            <input type="hidden" name="intent" value="calculate" />
            
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">DTF Quote Calculator</Text>
                
                {actionData?.error && actionData?.type === "calculate" && (
                  <Banner tone="critical">
                    <p>{actionData.error}</p>
                  </Banner>
                )}
                
                {actionData?.success && actionData?.type === "save_quote" && (
                  <Banner tone="success">
                    <p>{actionData.message}</p>
                  </Banner>
                )}
                
                <InlineGrid columns={3} gap="400">
                  <TextField
                    label="Width (inches)"
                    name="width"
                    value={width}
                    onChange={setWidth}
                    type="number"
                    step="0.1"
                    placeholder="10"
                    autoComplete="off"
                  />
                  <TextField
                    label="Height (inches)"
                    name="height"
                    value={height}
                    onChange={setHeight}
                    type="number"
                    step="0.1"
                    placeholder="8"
                    autoComplete="off"
                  />
                  <TextField
                    label="Quantity"
                    name="quantity"
                    value={quantity}
                    onChange={setQuantity}
                    type="number"
                    placeholder="50"
                    autoComplete="off"
                  />
                </InlineGrid>
                
                <InlineGrid columns={3} gap="400">
                  <TextField
                    label="Product Cost per Unit"
                    name="productCost"
                    value={productCost}
                    onChange={setProductCost}
                    type="number"
                    step="0.01"
                    prefix="$"
                    helpText="Cost of the product you'll print on"
                  />
                  <TextField
                    label="Heat Press Cost per Unit"
                    name="pressCost"
                    value={pressCost}
                    onChange={setPressCost}
                    type="number"
                    step="0.01"
                    prefix="$"
                    helpText="Your charge to heat press"
                  />
                  <TextField
                    label="Markup %"
                    name="markup"
                    value={markup}
                    onChange={setMarkup}
                    type="number"
                    step="5"
                    suffix="%"
                    helpText="Your desired markup"
                  />
                </InlineGrid>
                
                <Button
                  submit
                  variant="primary"
                  loading={loading}
                  onClick={() => setLoading(true)}
                >
                  Calculate Quote
                </Button>
              </BlockStack>
            </Card>
          </Form>
        </Layout.Section>

        {/* Results */}
        {results && (
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Calculation Results</Text>
                
                <InlineGrid columns={2} gap="400">
                  <Card background="bg-surface-secondary">
                    <BlockStack gap="200">
                      <Text variant="headingSm">Production Costs</Text>
                      <Text>Area per piece: {results.area} sq in</Text>
                      <Text>Total area: {results.totalArea} sq in</Text>
                      <Text>Imprint cost: ${results.imprintCost}</Text>
                      <Text>Product cost: ${results.totalProductCost}</Text>
                      <Text>Press cost: ${results.totalPressCost}</Text>
                      <Divider />
                      <Text variant="headingSm" color="critical">
                        Unit cost: ${results.unitCost}
                      </Text>
                    </BlockStack>
                  </Card>
                  
                  <Card background="bg-surface-success">
                    <BlockStack gap="200">
                      <Text variant="headingSm">Pricing & Profit</Text>
                      <Text>Retail per unit: ${results.retailUnit}</Text>
                      <Text>Total sale price: ${results.retailTotal}</Text>
                      <Divider />
                      <Text variant="headingMd" color="success">
                        Total profit: ${results.totalProfit}
                      </Text>
                    </BlockStack>
                  </Card>
                </InlineGrid>
                
                {/* Save Quote Section */}
                <Card>
                  <Form method="post">
                    <input type="hidden" name="intent" value="save_quote" />
                    <input type="hidden" name="quoteData" value={JSON.stringify(results)} />
                    
                    <BlockStack gap="400">
                      <Text variant="headingSm">Save Quote</Text>
                      <TextField
                        label="Quote Name"
                        name="quoteName"
                        value={quoteName}
                        onChange={setQuoteName}
                        placeholder="Enter quote name"
                      />
                      <ButtonGroup>
                        <Button
                          submit
                          variant="primary"
                          disabled={!dropboxConnected || !quoteName}
                        >
                          {dropboxConnected ? "Save to Dropbox" : "Connect Dropbox First"}
                        </Button>
                        <Button onClick={() => window.print()}>
                          Print Quote
                        </Button>
                      </ButtonGroup>
                    </BlockStack>
                  </Form>
                </Card>
              </BlockStack>
            </Card>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}
