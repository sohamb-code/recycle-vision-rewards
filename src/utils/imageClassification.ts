
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use browser cache
env.allowLocalModels = false;
env.useBrowserCache = false;

// Create a singleton instance of the classifier
let classifierInstance: any = null;

export const initializeClassifier = async () => {
  if (!classifierInstance) {
    classifierInstance = await pipeline(
      'image-classification',
      'onnx-community/mobilenetv4_conv_small.e2400_r224_in1k',
      { device: 'webgpu' }
    );
  }
  return classifierInstance;
};

export const classifyImage = async (imageUrl: string) => {
  try {
    const classifier = await initializeClassifier();
    const results = await classifier(imageUrl);
    return results[0]; // Return the top prediction
  } catch (error) {
    console.error('Error classifying image:', error);
    throw error;
  }
};
