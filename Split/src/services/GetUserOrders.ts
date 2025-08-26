export async function getUserOrders(userId: string) {
    const response = await fetch(`/orders/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error posting order: ${error}`);
    }
  
    return await response.json();
  }