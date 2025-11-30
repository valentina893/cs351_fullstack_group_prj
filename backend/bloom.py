import math
import hashlib

class BloomFilter:
    def __init__(self, n_items, false_positive_rate):
        # calculate filter size (m) and number of hash functions (k)
        self.m = self._optimal_m(n_items, false_positive_rate)
        self.k = self._optimal_k(n_items, self.m)

        # bit array
        self.bit_array = [0] * self.m

    def _optimal_m(self, n, p):
        # m = -(n * ln(p)) / (ln 2)^2
        return int(-(n * math.log(p)) / (math.log(2) ** 2))

    def _optimal_k(self, n, m):
        # k = (m / n) * ln(2)
        return max(1, int((m / n) * math.log(2)))

    def _hashes(self, item):
        item = item.encode("utf-8")
        hashes = []

        for i in range(self.k):
            # create k hash functions by salting SHA256
            h = hashlib.sha256(item + i.to_bytes(2, 'little')).hexdigest()
            pos = int(h, 16) % self.m
            hashes.append(pos)

        return hashes

    def add(self, item):
        for pos in self._hashes(item):
            self.bit_array[pos] = 1

    def __contains__(self, item):
        return all(self.bit_array[pos] == 1 for pos in self._hashes(item))import math
import hashlib

class BloomFilter:
    def __init__(self, n_items, false_positive_rate):
        # calculate filter size (m) and number of hash functions (k)
        self.m = self._optimal_m(n_items, false_positive_rate)
        self.k = self._optimal_k(n_items, self.m)

        # bit array
        self.bit_array = [0] * self.m

    def _optimal_m(self, n, p):
        # m = -(n * ln(p)) / (ln 2)^2
        return int(-(n * math.log(p)) / (math.log(2) ** 2))

    def _optimal_k(self, n, m):
        # k = (m / n) * ln(2)
        return max(1, int((m / n) * math.log(2)))

    def _hashes(self, item):
        item = item.encode("utf-8")
        hashes = []

        for i in range(self.k):
            # create k hash functions by salting SHA256
            h = hashlib.sha256(item + i.to_bytes(2, 'little')).hexdigest()
            pos = int(h, 16) % self.m
            hashes.append(pos)

        return hashes

    def add(self, item):
        for pos in self._hashes(item):
            self.bit_array[pos] = 1

    def __contains__(self, item):
        return all(self.bit_array[pos] == 1 for pos in self._hashes(item))
