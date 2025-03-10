import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CohereService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.cohere.ai/generate';
  private apiKey = 'TK8apuWbse9qkbcnNb1mcMAYjYFxyN9Aa9UwR5Ib';

  public generateMealPrepInstructions(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    const body = {
      model: 'command',
      prompt: prompt,
      temperature: 0.7,
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
