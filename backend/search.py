"""
DuckDuckGo Search API utility functions for pulling 
web data as our data source. No pre-processing needed.

Code written by Valentina RS
"""

import json
from ddgs import DDGS
from bloom import BloomFilter

bf = BloomFilter(n_items=500, false_positive_rate=0.01)

def ddg_general_search(query, max_results=5):
    results = []
    with DDGS() as ddgs:
        for r in ddgs.text(query, max_results=max_results):
            print("DEBUG RAW RESULT:", r) 
            url = r.get("href", "")
            if url and url in bf:
                print("DEBUG: Duplicate URL skipped by Bloom filter:", url)
                continue
            
            bf.add(url)

            results.append({
                "title": r.get("title", ""),
                "url": r.get("href", ""),
                "snippet": r.get("body", "")
            })
    print("DEBUG FINAL RESULTS:", results)
    return results


def test():
    query = "university of illinois at chicago events"
    info = ddg_general_search(query)

    print(f"🔍 Results for: {query}\n")
    print(info)

#test()