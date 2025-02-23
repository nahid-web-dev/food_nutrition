"use server"

import axios from "axios"

const convertFileToBase64 = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  return Buffer.from(arrayBuffer).toString("base64")
}

export const generateRecipes = async (prevState: any, formData: any) => {
  "use server"
  try {
    const dietaryOption = formData.get("dietaryOption") as string
    const cuisineOption = formData.get("cuisineOption") as string
    const image = formData.get("image") as File

    if (!image) {
      throw new Error("No image provided.")
    }

    const mimeType = image.type
    console.log(mimeType)
    const base64Image = await convertFileToBase64(image)


    const prompt = `Generate a ${dietaryOption} recipe in the ${cuisineOption} cuisine style based on the ingredients visible in the image. The response must be in JSON format as follows:

    {
      "name": "[Recipe Name]",
      "prepTime": "[Preparation Time in minutes]",
      "servings": [Number of servings],
      "ingredients": ["ingredient1", "ingredient2", "..."],
      "instructions": ["instruction1", "instruction2", "..."],
      "imageUrl": "[Provide the image url of that recipe related dish from any source.]"
    }

    Note: 1.Max ingredients's length 12.
          2.Instructions's length 4-7 sentences.
          3.the image should be related to the recipe you provide. and try to provide image in square shape. the url must be valid.

    Ensure the response is in **valid JSON format** so it can be parsed correctly. The image URL must be from one of the supported domains.Don't response anything other than the JSON Object.`
    // const prompt = `Generate a ${dietaryOption} recipe in the ${cuisineOption} cuisine style based on the ingredients visible in the image. The response must be in JSON format as follows:

    // {
    //   "name": "[Recipe Name]",
    //   "prepTime": "[Preparation Time in minutes]",
    //   "servings": [Number of servings],
    //   "ingredients": ["ingredient1", "ingredient2", "..."],
    //   "instructions": ["instruction1", "instruction2", "..."],
    //   "imageUrl": "[A relevant URL of the Recipe from images.pexels.com, cdn.pixabay.com, or images.unsplash.com]"
    // }

    // Note: 1.Max ingredients's length 12.
    //       2.Instructions's length 4-7 sentences.
    //       3.the imageUrl should be valid and it's related to food, specially related to the recipe you providing.

    // Ensure the response is in **valid JSON format** so it can be parsed correctly. The image URL must be from one of the supported domains.Don't response anything other than the JSON Object.`


    // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
    // const requestData = {
    //   contents: [
    //     {
    //       parts: [
    //         { text: prompt },
    //         {
    //           inlineData: {
    //             mimeType: mimeType,
    //             data: base64Image
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // };
    // const response = await axios.post(url, requestData, {
    //   headers: { "Content-Type": "application/json" }
    // })
    // const generatedText = response.data?.candidates[0]?.content?.parts[0]?.text
    // const recipeInfo = parseRecipeInfo(generatedText)

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      // "model": "openai/gpt-4o-2024-11-20",
      "model": "openai/gpt-4o-mini",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt
            },
            {
              "type": "image_url",
              "image_url": {
                "url": `data:${image.type};base64,${base64Image}`
              }
            }
          ]
        }
      ]
    }, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${process.env.OR_API_KEY}`
      }
    })

    const generatedText = response.data?.choices[0]?.message?.content
    console.log(generatedText)
    console.log("Token Usage:", response.data.usage);
    console.log("Prompt Tokens:", response.data.usage.prompt_tokens);
    console.log("Completion Tokens:", response.data.usage.completion_tokens);
    console.log("Total Tokens:", response.data.usage.total_tokens);


    const recipeInfo = parseRecipeInfo(generatedText)

    return {
      success: true,
      ...recipeInfo,
    }
  } catch (error: any) {
    console.error("Error generating recipe:", error?.response?.data)
    return {
      error: error?.message || "An error occurred while generating the recipe.",
    }
  }
}

function parseRecipeInfo(text: string) {
  try {
    const data = JSON.parse(text.replace(/```json|```/g, "").trim())

    if (!data.name || !data.prepTime || !data.servings || !data.ingredients || !data.instructions || !data.imageUrl) {
      throw new Error("Invalid JSON format received from AI")
    }

    return {
      name: data.name,
      prepTime: data.prepTime,
      servings: data.servings,
      ingredients: data.ingredients,
      instructions: data.instructions,
      imageUrl: data.imageUrl,
    }

  } catch (error) {
    console.error("Error parsing recipe JSON:", error)
    return {
      error: "Failed to parse recipe data.",
    }
  }
}
