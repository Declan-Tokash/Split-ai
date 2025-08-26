export async function getOrderById(id: string) {
    const response = await fetch(`/order/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error fetching order: ${error}`);
    }
  
    return await response.json();
  }