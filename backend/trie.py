"""
Trie used for storing user's interest.

Most optimal advanced data structure since 
we want the user to search their interests.

Other data structures wouldn't allow us to 
quickly store words and have fast look-up times.
 - We originally considered a priority queue for 
   recommending interests, but we realized the 
   search engine api was already good for that.


Code written by Valentina RS
"""

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word.lower():
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        node = self.root
        for char in word.lower():
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for char in prefix.lower():
            if char not in node.children:
                return []
            node = node.children[char]
        # DFS to collect all words starting from this prefix
        results = []
        self._collect(prefix.lower(), node, results)
        return results

    def _collect(self, prefix, node, results):
        if node.is_end:
            results.append(prefix)
        for char, child in node.children.items():
            self._collect(prefix + char, child, results)