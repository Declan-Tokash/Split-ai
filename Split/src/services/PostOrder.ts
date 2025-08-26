export async function postOrder(order: any) {
    const response = await fetch(`/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error posting order: ${error}`);
    }
  
    return await response.json();
  }