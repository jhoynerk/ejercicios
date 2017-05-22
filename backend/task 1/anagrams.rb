require "test/unit"

class Anagrams
  def initialize(word, possible_anagrams)
    @word = word
    @possible_anagrams = possible_anagrams
  end

  def anagrams
    search_anagrams
  end

  private
    def search_anagrams
      @possible_anagrams.map { |possible| possible if is_anagrams?(possible) }.compact!
    end

    def is_anagrams?(possible)
      possible.each_char{ |char| ( exist_into_word?(char) && eql_lenght?(possible) && eql_sum_bytes?(possible) ) ? true : return }
    end

    def exist_into_word?(char)
      @word.include?(char)
    end

    def eql_lenght?(word)
      (@word.length == word.length)
    end

    def eql_sum_bytes?(word)
      (@word.sum == word.sum)
    end
end

class ModulinoTest < Test::Unit::TestCase
  def test_anagrams
    word = 'horse'
    possible_anagrams = ['heros', 'horse', 'shore', 'default']

    p "Word: #{word}"
    p "Test 1: array: #{possible_anagrams}"

    assert_equal(['heros', 'horse', 'shore'], Anagrams.new(word, possible_anagrams).anagrams)

    possible_anagrams = possible_anagrams + ['shoor', 'horss'] #add eql lenght
    assert_equal(['heros', 'horse', 'shore'], Anagrams.new(word, possible_anagrams).anagrams)

    possible_anagrams = possible_anagrams + ['shores', 'horses'] # add plurals
    assert_equal(['heros', 'horse', 'shore'], Anagrams.new(word, possible_anagrams).anagrams)

    possible_anagrams = possible_anagrams + ['hoers', 'hoser', 'shoer'] # Add matches
    assert_equal(['heros', 'horse', 'shore', 'hoers', 'hoser', 'shoer'], Anagrams.new(word, possible_anagrams).anagrams)
  end
end
