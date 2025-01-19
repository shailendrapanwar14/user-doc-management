import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentsService {
  private documents = []; // Example in-memory store, replace with DB logic in production

  // Create method
  create(document: any) {
    const newDocument = { id: Date.now(), ...document };
    this.documents.push(newDocument);
    return newDocument;
  }

  // Find all method
  findAll() {
    return this.documents;
  }

  // Delete method
  delete(id: number) {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index === -1) {
      throw new Error(`Document with ID ${id} not found`);
    }
    return this.documents.splice(index, 1)[0];
  }
}
