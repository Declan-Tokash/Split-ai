export async function analyzeImage(image: any) {
    const response = await fetch(`/parse-reciept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64Image: `data:image/png;base64,${image}`, // add prefix if needed
      }),
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error from edge function: ${error}`);
    }
  
    return await response.json();
  }
