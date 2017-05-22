require "test/unit"

class Frog
  def initialize(x, y, d)
    @x = x
    @y = y
    @d = d
    @count = 0
  end

  def jumps
    (validate?) ? jumps_to_end : nil
  end

  private
    # "x" greater than or equal to "y" && "d" greater than 0
    def validate?
      ( @x <= @y && @d > 0 )
    end

    # if "x" equal to "y" return is 0
    def jumps_to_end
      ( @x == @y ) ? 0 : get_jumps_to_end
    end

    def get_jumps_to_end
      loop do
        @x = jump(@x)
        @count+= 1
        break @count if @x >= @y
      end
    end

    def jump(init)
      init + @d
    end
end

class ModulinoTest < Test::Unit::TestCase
  def test_Frog
    x = 10
    y = 85
    d = 30
    p "Test 1: x: #{x} y: #{y} d: #{d}"
    assert_equal( 3, Frog.new( x, y, d ).jumps )
    assert_not_equal( 2, Frog.new( x, y, d ).jumps )

    x = 20
    y = 100
    d = 10
    p "Test 2: x: #{x} y: #{y} d: #{d}"
    assert_equal( 8, Frog.new( x, y, d ).jumps )
    assert_not_equal( 6, Frog.new( x, y, d ).jumps )

    # x Greater than y
    x = 200
    y = 100
    d = 10
    p "Test 3: x: #{x} y: #{y} d: #{d}"
    assert_equal( nil, Frog.new( x, y, d ).jumps )

    # x equal to y
    x = 100
    y = 100
    d = 10
    p "Test 4: x: #{x} y: #{y} d: #{d}"
    assert_equal( 0, Frog.new( x, y, d ).jumps )

    # d != 0
    x = 10
    y = 100
    d = 0
    p "Test 5: x: #{x} y: #{y} d: #{d}"
    assert_equal( nil, Frog.new( x, y, d ).jumps )

    # d != 0
    x = nil
    y = 100
    d = nil
    p "Test 5: x: #{x} y: #{y} d: #{d}"
    assert_equal( nil, Frog.new( x, y, d ).jumps )
  end
end


