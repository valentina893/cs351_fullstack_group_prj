"""
DuckDuckGo Search API utility functions for pulling web data.

Code written by Valentina RS
"""

from ddgs import DDGS

def ddg_general_search(query, max_results=5):
    results = []
    with DDGS() as ddgs:
        for r in ddgs.text(query, max_results=max_results):
            results.append({
                "title": r["title"],
                "url": r["href"],
                "snippet": r["body"]
            })
    return results

def main():
    query = "university of illinois at chicago events"
    info = ddg_general_search(query)

    print(f"🔍 Results for: {query}\n")
    for i, item in enumerate(info, 1):
        print(f"{i}. {item['title']}\n   {item['url']}\n   {item['snippet']}\n")

main()
