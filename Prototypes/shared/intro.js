(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var POSES = {
    rig: '<g transform="scale(.34) translate(-100,-267)"><g class="wb"><g class="limb lF"><path class="far" d="M95.5 158 C 93.8 183 92.8 209 92.4 235 C 92.2 243 92.2 251 92.4 258.6 L 100 258.4 C 100.4 251.6 100.8 243.8 101.2 236 C 102.2 210.6 103 184.6 103.4 158.6 Z"/><path class="far" d="M92.2 258.4 L 99.7 258.0 C 105.7 258.2 110.0 260.2 110.7 263.2 C 111.2 265.59999999999997 109.2 267.0 106.2 267.0 L 94.2 267.0 C 92.60000000000001 267.0 91.60000000000001 265.79999999999995 91.60000000000001 264.2 Z"/></g><g class="limb lN"><path class="near" d="M101.5 159 C 102.4 184 103.6 210 104.8 235 C 105.3 243 105.8 251 106.3 258.4 L 113.9 258 C 113.4 251.2 112.9 243.4 112.4 235.6 C 111 210.4 109 184.4 106.8 158.4 Z"/><path class="near" d="M106.1 258.2 L 113.6 257.8 C 119.6 258.0 123.89999999999999 260.0 124.6 263.0 C 125.1 265.4 123.1 266.8 120.1 266.8 L 108.1 266.8 C 106.5 266.8 105.5 265.59999999999997 105.5 264.0 Z"/></g><g transform="rotate(3 100 156)"><path class="top" d="M100 95.5 C 110.5 95.5 117.6 99.4 119.4 106.5 C 121 113 119.6 121.5 117 130 C 115.4 135.4 114.6 140.8 115.2 146 C 115.8 151 114.2 154.8 109.8 156.6 C 103.5 159.2 96.5 159.2 90.2 156.6 C 85.8 154.8 84.2 151 84.8 146 C 85.4 140.8 84.6 135.4 83 130 C 80.4 121.5 79 113 80.6 106.5 C 82.4 99.4 89.5 95.5 100 95.5 Z"/></g><g class="limb aF"><path class="far" d="M86.5 104.5 C 81.5 112.5 78.2 122 76.6 132 C 75.7 138 75.4 144.4 75.8 150.8 C 76 153.8 78.4 155.9 81.4 155.5 C 84.1 155.1 86 152.8 85.9 150 C 85.6 144.2 85.9 138.4 87 132.8 C 88.4 125.6 90.8 118.8 94.2 112.6 Z"/><circle class="far" cx="81.4" cy="159.8" r="4.2"/></g><g class="limb aN"><path class="near" d="M113.5 104.5 C 118.5 112.5 121.8 122 123.4 132 C 124.3 138 124.6 144.4 124.2 150.8 C 124 153.8 121.6 155.9 118.6 155.5 C 115.9 155.1 114 152.8 114.1 150 C 114.4 144.2 114.1 138.4 113 132.8 C 111.6 125.6 109.2 118.8 105.8 112.6 Z"/><circle class="near" cx="118.6" cy="159.8" r="4.2"/></g><path class="near" d="M98.5 84.5 L 105.5 84.5 L 105 97 L 99 97 Z"/><g transform="translate(102 93) scale(.92) translate(-102 -93)"><path class="near" d="M92.5 83.5 C 89.5 78.5 88.8 70.5 92 65 C 95 59.5 101.5 57 107.5 58.6 C 112.8 60 116.2 64.4 116.8 69.6 L 119.6 73.4 C 120.2 74.2 119.7 75.3 118.7 75.4 L 116.7 75.7 C 116.6 76.9 116.3 78 115.8 79 L 117 80.2 C 117.6 80.9 117.2 81.9 116.3 82 L 114.2 82.3 C 112.9 84.4 110.8 86 108.2 86.8 C 103 88.5 96.5 87 92.5 83.5 Z"/><path class="hairfill" d="M107 57.6 C 98 54.2 88.6 56.8 84.8 64.4 C 81.4 71.2 81.6 81.6 84.6 91 C 86.6 97.2 90 102.2 94.6 104.8 C 97.4 106.4 100.4 106.6 102.6 105.4 C 99 101.4 96.6 96 95.6 90 C 94.8 84.8 95.2 79.8 96.8 75.6 C 98 72.4 99.9 69.9 102.3 68.3 C 106.8 72 112.4 72.6 115.6 69.6 C 116.4 65 113.2 59.8 107 57.6 Z"/></g><path class="accent" d="M94 99.5 C 97.8 97 104.2 97 108 99.5 C 105.6 103.8 96.4 103.8 94 99.5 Z"/></g></g>',
    walk: '<g transform="scale(.34) translate(-100,-236)"><path class="far" d="M95 156 C 91.5 171 86.5 186 79.5 199.5 C 75.5 207.5 71 215 66.5 222 C 64.8 224.8 65.8 228 68.6 229.4 C 71.2 230.6 74.2 229.6 75.8 227 C 80.8 219.2 85.4 211 89.6 202.6 C 95.6 190.2 100.6 177.2 104 164 Z"/><g transform="rotate(-24 66 231)"><path class="far" d="M64 224.5 L 71.5 224.1 C 77.5 224.3 81.8 226.3 82.5 229.3 C 83 231.7 81 233.1 78 233.1 L 66 233.1 C 64.4 233.1 63.4 231.9 63.4 230.3 Z"/></g><path class="near" d="M104 158 C 108.5 172 114 185.5 121 198.5 C 125.5 206.8 130.5 214.6 135.8 222 C 137.6 224.6 136.8 227.8 134.2 229.4 C 131.6 230.8 128.6 230 127 227.4 C 121.2 219.6 115.8 211.2 111 202.6 C 104 190 98.4 176.6 94.8 162.8 Z"/><path class="near" d="M128.5 224 L 136.0 223.6 C 142.0 223.8 146.3 225.8 147.0 228.8 C 147.5 231.2 145.5 232.6 142.5 232.6 L 130.5 232.6 C 128.9 232.6 127.9 231.4 127.9 229.8 Z"/><g transform="rotate(3 100 156)"><path class="top" d="M100 95.5 C 110.5 95.5 117.6 99.4 119.4 106.5 C 121 113 119.6 121.5 117 130 C 115.4 135.4 114.6 140.8 115.2 146 C 115.8 151 114.2 154.8 109.8 156.6 C 103.5 159.2 96.5 159.2 90.2 156.6 C 85.8 154.8 84.2 151 84.8 146 C 85.4 140.8 84.6 135.4 83 130 C 80.4 121.5 79 113 80.6 106.5 C 82.4 99.4 89.5 95.5 100 95.5 Z"/></g><path class="far" d="M87 104.5 C 80.5 111 75.2 119.5 71.8 129 C 70.6 132.4 69.9 136 69.7 139.6 C 69.5 142.6 71.9 144.9 74.9 144.7 C 77.6 144.5 79.6 142.3 79.7 139.6 C 79.9 133.4 81.7 127.4 84.9 122 C 87.5 117.6 90.9 113.8 94.9 110.8 Z"/><circle class="far" cx="74.5" cy="148.8" r="4.2"/><path class="near" d="M113.5 103.5 C 121 108.5 127 115.5 130.8 124 C 132.2 127.2 133 130.7 133.3 134.2 C 133.5 137.2 131.2 139.6 128.2 139.5 C 125.5 139.4 123.4 137.3 123.2 134.6 C 122.8 128.4 120.8 122.5 117.4 117.3 C 114.6 113 110.9 109.4 106.7 106.6 Z"/><circle class="near" cx="128.6" cy="143.7" r="4.2"/><path class="near" d="M98.5 84.5 L 105.5 84.5 L 105 97 L 99 97 Z"/><g transform="translate(102 93) scale(.92) translate(-102 -93)"><path class="near" d="M92.5 83.5 C 89.5 78.5 88.8 70.5 92 65 C 95 59.5 101.5 57 107.5 58.6 C 112.8 60 116.2 64.4 116.8 69.6 L 119.6 73.4 C 120.2 74.2 119.7 75.3 118.7 75.4 L 116.7 75.7 C 116.6 76.9 116.3 78 115.8 79 L 117 80.2 C 117.6 80.9 117.2 81.9 116.3 82 L 114.2 82.3 C 112.9 84.4 110.8 86 108.2 86.8 C 103 88.5 96.5 87 92.5 83.5 Z"/><path class="hairfill" d="M107 57.6 C 98 54.2 88.6 56.8 84.8 64.4 C 81.4 71.2 81.6 81.6 84.6 91 C 86.6 97.2 90 102.2 94.6 104.8 C 97.4 106.4 100.4 106.6 102.6 105.4 C 99 101.4 96.6 96 95.6 90 C 94.8 84.8 95.2 79.8 96.8 75.6 C 98 72.4 99.9 69.9 102.3 68.3 C 106.8 72 112.4 72.6 115.6 69.6 C 116.4 65 113.2 59.8 107 57.6 Z"/></g><path class="accent" d="M94 99.5 C 97.8 97 104.2 97 108 99.5 C 105.6 103.8 96.4 103.8 94 99.5 Z"/></g>',
    pass: '<g transform="scale(.34) translate(-100,-267)"><path class="far" d="M95.5 158 C 93.8 183 92.8 209 92.4 235 C 92.2 243 92.2 251 92.4 258.6 L 100 258.4 C 100.4 251.6 100.8 243.8 101.2 236 C 102.2 210.6 103 184.6 103.4 158.6 Z"/><path class="far" d="M92.2 258.4 L 99.7 258.0 C 105.7 258.2 110.0 260.2 110.7 263.2 C 111.2 265.59999999999997 109.2 267.0 106.2 267.0 L 94.2 267.0 C 92.60000000000001 267.0 91.60000000000001 265.79999999999995 91.60000000000001 264.2 Z"/><path class="near" d="M101.5 159 C 102.4 184 103.6 210 104.8 235 C 105.3 243 105.8 251 106.3 258.4 L 113.9 258 C 113.4 251.2 112.9 243.4 112.4 235.6 C 111 210.4 109 184.4 106.8 158.4 Z"/><path class="near" d="M106.1 258.2 L 113.6 257.8 C 119.6 258.0 123.89999999999999 260.0 124.6 263.0 C 125.1 265.4 123.1 266.8 120.1 266.8 L 108.1 266.8 C 106.5 266.8 105.5 265.59999999999997 105.5 264.0 Z"/><g transform="rotate(3 100 156)"><path class="top" d="M100 95.5 C 110.5 95.5 117.6 99.4 119.4 106.5 C 121 113 119.6 121.5 117 130 C 115.4 135.4 114.6 140.8 115.2 146 C 115.8 151 114.2 154.8 109.8 156.6 C 103.5 159.2 96.5 159.2 90.2 156.6 C 85.8 154.8 84.2 151 84.8 146 C 85.4 140.8 84.6 135.4 83 130 C 80.4 121.5 79 113 80.6 106.5 C 82.4 99.4 89.5 95.5 100 95.5 Z"/></g><path class="far" d="M86.5 104.5 C 81.5 112.5 78.2 122 76.6 132 C 75.7 138 75.4 144.4 75.8 150.8 C 76 153.8 78.4 155.9 81.4 155.5 C 84.1 155.1 86 152.8 85.9 150 C 85.6 144.2 85.9 138.4 87 132.8 C 88.4 125.6 90.8 118.8 94.2 112.6 Z"/><circle class="far" cx="81.4" cy="159.8" r="4.2"/><path class="near" d="M113.5 104.5 C 118.5 112.5 121.8 122 123.4 132 C 124.3 138 124.6 144.4 124.2 150.8 C 124 153.8 121.6 155.9 118.6 155.5 C 115.9 155.1 114 152.8 114.1 150 C 114.4 144.2 114.1 138.4 113 132.8 C 111.6 125.6 109.2 118.8 105.8 112.6 Z"/><circle class="near" cx="118.6" cy="159.8" r="4.2"/><path class="near" d="M98.5 84.5 L 105.5 84.5 L 105 97 L 99 97 Z"/><g transform="translate(102 93) scale(.92) translate(-102 -93)"><path class="near" d="M92.5 83.5 C 89.5 78.5 88.8 70.5 92 65 C 95 59.5 101.5 57 107.5 58.6 C 112.8 60 116.2 64.4 116.8 69.6 L 119.6 73.4 C 120.2 74.2 119.7 75.3 118.7 75.4 L 116.7 75.7 C 116.6 76.9 116.3 78 115.8 79 L 117 80.2 C 117.6 80.9 117.2 81.9 116.3 82 L 114.2 82.3 C 112.9 84.4 110.8 86 108.2 86.8 C 103 88.5 96.5 87 92.5 83.5 Z"/><path class="hairfill" d="M107 57.6 C 98 54.2 88.6 56.8 84.8 64.4 C 81.4 71.2 81.6 81.6 84.6 91 C 86.6 97.2 90 102.2 94.6 104.8 C 97.4 106.4 100.4 106.6 102.6 105.4 C 99 101.4 96.6 96 95.6 90 C 94.8 84.8 95.2 79.8 96.8 75.6 C 98 72.4 99.9 69.9 102.3 68.3 C 106.8 72 112.4 72.6 115.6 69.6 C 116.4 65 113.2 59.8 107 57.6 Z"/></g><path class="accent" d="M94 99.5 C 97.8 97 104.2 97 108 99.5 C 105.6 103.8 96.4 103.8 94 99.5 Z"/></g>',
    listen: '<g transform="scale(.34) translate(-100,-267)"><path class="far" d="M95.5 158 C 93.8 183 92.8 209 92.4 235 C 92.2 243 92.2 251 92.4 258.6 L 100 258.4 C 100.4 251.6 100.8 243.8 101.2 236 C 102.2 210.6 103 184.6 103.4 158.6 Z"/><path class="far" d="M92.2 258.4 L 99.7 258.0 C 105.7 258.2 110.0 260.2 110.7 263.2 C 111.2 265.59999999999997 109.2 267.0 106.2 267.0 L 94.2 267.0 C 92.60000000000001 267.0 91.60000000000001 265.79999999999995 91.60000000000001 264.2 Z"/><path class="near" d="M101.5 159 C 102.2 184 103.2 210 104.2 235 C 104.6 243 105 251 105.4 258.4 L 113 258 C 112.6 251.2 112.2 243.4 111.8 235.6 C 110.6 210.4 108.8 184.4 106.8 158.4 Z"/><path class="near" d="M105.2 258.2 L 112.7 257.8 C 118.7 258.0 123.0 260.0 123.7 263.0 C 124.2 265.4 122.2 266.8 119.2 266.8 L 107.2 266.8 C 105.60000000000001 266.8 104.60000000000001 265.59999999999997 104.60000000000001 264.0 Z"/><g transform="rotate(0 100 156)"><path class="top" d="M100 95.5 C 110.5 95.5 117.6 99.4 119.4 106.5 C 121 113 119.6 121.5 117 130 C 115.4 135.4 114.6 140.8 115.2 146 C 115.8 151 114.2 154.8 109.8 156.6 C 103.5 159.2 96.5 159.2 90.2 156.6 C 85.8 154.8 84.2 151 84.8 146 C 85.4 140.8 84.6 135.4 83 130 C 80.4 121.5 79 113 80.6 106.5 C 82.4 99.4 89.5 95.5 100 95.5 Z"/></g><path class="far" d="M86.5 104.5 C 81.5 112.5 78.2 122 76.6 132 C 75.7 138 75.4 144.4 75.8 150.8 C 76 153.8 78.4 155.9 81.4 155.5 C 84.1 155.1 86 152.8 85.9 150 C 85.6 144.2 85.9 138.4 87 132.8 C 88.4 125.6 90.8 118.8 94.2 112.6 Z"/><circle class="far" cx="81.4" cy="159.8" r="4.2"/><path class="near" d="M114.5 103 C 120.5 108 124.8 115 126.6 123 C 127.6 127.8 126 131.9 121.8 134.5 C 117.6 137.1 112.6 138.7 107.6 138.9 C 105 139 103 137.1 103 134.6 C 103 132.2 104.8 130.3 107.2 130 C 110.9 129.6 114.2 128.5 117 126.6 C 115.6 119.9 112.6 113.7 108.2 108.4 Z"/><circle class="accent" cx="106" cy="135" r="5.5"/><path class="near" d="M98.5 84.5 L 105.5 84.5 L 105 97 L 99 97 Z"/><g transform="translate(102 93) scale(.92) translate(-102 -93) rotate(-7 102 74)"><path class="near" d="M92.5 83.5 C 89.5 78.5 88.8 70.5 92 65 C 95 59.5 101.5 57 107.5 58.6 C 112.8 60 116.2 64.4 116.8 69.6 L 119.6 73.4 C 120.2 74.2 119.7 75.3 118.7 75.4 L 116.7 75.7 C 116.6 76.9 116.3 78 115.8 79 L 117 80.2 C 117.6 80.9 117.2 81.9 116.3 82 L 114.2 82.3 C 112.9 84.4 110.8 86 108.2 86.8 C 103 88.5 96.5 87 92.5 83.5 Z"/><path class="hairfill" d="M107 57.6 C 98 54.2 88.6 56.8 84.8 64.4 C 81.4 71.2 81.6 81.6 84.6 91 C 86.6 97.2 90 102.2 94.6 104.8 C 97.4 106.4 100.4 106.6 102.6 105.4 C 99 101.4 96.6 96 95.6 90 C 94.8 84.8 95.2 79.8 96.8 75.6 C 98 72.4 99.9 69.9 102.3 68.3 C 106.8 72 112.4 72.6 115.6 69.6 C 116.4 65 113.2 59.8 107 57.6 Z"/></g><path class="accent" d="M94 99.5 C 97.8 97 104.2 97 108 99.5 C 105.6 103.8 96.4 103.8 94 99.5 Z"/></g>',
    setoff: '<g transform="scale(.34) translate(-100,-267)"><path class="far" d="M95 157 C 93.4 182 92.6 208 92.4 234 C 92.3 242 92.3 250 92.5 258.6 L 100.1 258.4 C 100.5 251.6 100.9 243.8 101.2 236 C 102 211 102.8 185 103.2 158 Z"/><path class="far" d="M92.3 258.4 L 99.8 258.0 C 105.8 258.2 110.1 260.2 110.8 263.2 C 111.3 265.59999999999997 109.3 267.0 106.3 267.0 L 94.3 267.0 C 92.7 267.0 91.7 265.79999999999995 91.7 264.2 Z"/><path class="near" d="M103.5 158 C 105.6 175 108.2 192 111.6 208.6 C 113.6 218.4 115.8 228.1 118.2 237.8 C 118.9 240.7 117.3 243.6 114.4 244.3 C 111.7 244.9 109 243.3 108.2 240.6 C 105.6 230.7 103.3 220.7 101.4 210.5 C 98.6 195.4 96.5 180.2 95.2 164.9 Z"/><g transform="rotate(-4 114 250)"><path class="near" d="M110.5 246 L 118.0 245.6 C 124.0 245.8 128.3 247.8 129.0 250.8 C 129.5 253.2 127.5 254.6 124.5 254.6 L 112.5 254.6 C 110.9 254.6 109.9 253.4 109.9 251.8 Z"/></g><g transform="rotate(2 100 156)"><path class="top" d="M100 95.5 C 110.5 95.5 117.6 99.4 119.4 106.5 C 121 113 119.6 121.5 117 130 C 115.4 135.4 114.6 140.8 115.2 146 C 115.8 151 114.2 154.8 109.8 156.6 C 103.5 159.2 96.5 159.2 90.2 156.6 C 85.8 154.8 84.2 151 84.8 146 C 85.4 140.8 84.6 135.4 83 130 C 80.4 121.5 79 113 80.6 106.5 C 82.4 99.4 89.5 95.5 100 95.5 Z"/></g><path class="far" d="M86.5 104.5 C 81.5 112.5 78.2 122 76.6 132 C 75.7 138 75.4 144.4 75.8 150.8 C 76 153.8 78.4 155.9 81.4 155.5 C 84.1 155.1 86 152.8 85.9 150 C 85.6 144.2 85.9 138.4 87 132.8 C 88.4 125.6 90.8 118.8 94.2 112.6 Z"/><circle class="far" cx="81.4" cy="159.8" r="4.2"/><g class="parm"><path class="near" d="M113 103 C 120.5 103.2 128 102.2 135.2 100.2 C 143.6 97.9 151.6 94.4 158.8 89.8 C 161.2 88.3 164.2 89.1 165.6 91.5 C 167 93.9 166.2 96.9 163.8 98.3 C 155.8 103.2 147 106.9 137.8 109.3 C 129.7 111.4 121.3 112.3 112.9 112 Z"/><circle class="accent" cx="164.5" cy="93.5" r="6"/></g><path class="near" d="M98.5 84.5 L 105.5 84.5 L 105 97 L 99 97 Z"/><g transform="translate(102 93) scale(.92) translate(-102 -93) rotate(4 102 74)"><path class="near" d="M92.5 83.5 C 89.5 78.5 88.8 70.5 92 65 C 95 59.5 101.5 57 107.5 58.6 C 112.8 60 116.2 64.4 116.8 69.6 L 119.6 73.4 C 120.2 74.2 119.7 75.3 118.7 75.4 L 116.7 75.7 C 116.6 76.9 116.3 78 115.8 79 L 117 80.2 C 117.6 80.9 117.2 81.9 116.3 82 L 114.2 82.3 C 112.9 84.4 110.8 86 108.2 86.8 C 103 88.5 96.5 87 92.5 83.5 Z"/><path class="hairfill" d="M107 57.6 C 98 54.2 88.6 56.8 84.8 64.4 C 81.4 71.2 81.6 81.6 84.6 91 C 86.6 97.2 90 102.2 94.6 104.8 C 97.4 106.4 100.4 106.6 102.6 105.4 C 99 101.4 96.6 96 95.6 90 C 94.8 84.8 95.2 79.8 96.8 75.6 C 98 72.4 99.9 69.9 102.3 68.3 C 106.8 72 112.4 72.6 115.6 69.6 C 116.4 65 113.2 59.8 107 57.6 Z"/></g><path class="accent" d="M94 99.5 C 97.8 97 104.2 97 108 99.5 C 105.6 103.8 96.4 103.8 94 99.5 Z"/></g>'
  };

  var MOODS = {
    /* beat 1: the overwhelm — small restless marks above her head */
    overwhelm: '<g transform="translate(2,-78)">'
      +'<path class="sq" d="M-14 0 q4 -6 8 0"/>'
      +'<path class="sq" d="M-2 -6 q4 -6 8 0"/>'
      +'<path class="sq" d="M10 -1 q4 -6 8 0"/></g>',
    /* beat 3: the clarity — one warm spark */
    calm: '<g transform="translate(12,-76)"><text class="spark" font-size="13" text-anchor="middle">\u2726</text></g>'
  };

  var BEATS=[
    {cam:0,    walk:86,  gy:255, pose:'pass', idle:'swaying', mood:'overwhelm', hot:true,
     t:"You've been trying to work out what's going on with your body.",
     s:"So has the internet. Loudly, and not about you.",
     data:{lbl:'Why this screen exists',fig:'72%',
       p:'of women say health information is confusing to navigate. Found wins on <b>clarity and interpretation</b>, not on more data.',
       src:'Found brand positioning · internal figure, source before external use'}},
    {cam:-390, walk:428, gy:247, pose:'listen', idle:'breathing', mood:null, hot:false,
     t:"Tell us what's going on.",
     s:"A few questions, in your own words. Nothing to look up first."},
    {cam:-770, walk:974, gy:250, pose:'setoff', idle:'pointing', mood:'calm', hot:false,
     t:"You leave knowing where to start.",
     s:"One place to begin, and the reason it's that one."}
  ];

  var bi=0, timers=[], facing=1, transiting=false;
  var dev=document.getElementById('dev'), cam=document.getElementById('camera'),
      walker=document.getElementById('walker'), wbody=document.getElementById('wbody'),
      mood=document.getElementById('mood'), hotspot=document.getElementById('hotspot'),
      copy=document.getElementById('copy'), ct=document.getElementById('ct'),
      cs=document.getElementById('cs'), pop=document.getElementById('pop');

  function later(fn,ms){ timers.push(setTimeout(fn, reduce?10:ms)); }
  function clear(){ timers.forEach(clearTimeout); timers=[]; stopStride(); }

  function placeWalker(x,y){
    walker.setAttribute('transform','translate('+x+','+y+') scale('+facing+',1)');
  }

  /* walking = the rig with its limbs swinging; stopping = swapping the
     class off, never the frame. Nothing ever blinks. */
  function startStride(){
    wbody.innerHTML=POSES.rig;
    walker.classList.add('walking');
  }
  function stopStride(){
    walker.classList.remove('walking');
  }
  function setIdle(cls){
    ['walking','swaying','breathing','pointing'].forEach(function(c){walker.classList.remove(c);});
    if(cls && !reduce) walker.classList.add(cls);
  }

  function arrive(b){
    facing=1; placeWalker(b.walk,b.gy);
    wbody.innerHTML=POSES[b.pose];
    setIdle(b.idle);
    mood.innerHTML = b.mood ? MOODS[b.mood] : '';
    hotspot.style.display = b.hot ? '' : 'none';
    later(function(){ ct.textContent=b.t; cs.textContent=b.s; copy.classList.add('in'); },80);
    ['exitline','startpt'].forEach(function(id){
      var n=document.getElementById(id);
      if(bi===2){ later(function(){n.classList.add('on');},250); }
      else n.classList.remove('on');
    });
    document.querySelectorAll('#dots i').forEach(function(d,i){ d.classList.toggle('on', i<=bi); });
    document.getElementById('prev').disabled = bi===0;
    document.getElementById('next').textContent = bi===2 ? 'Start' : 'Next';
    transiting=false;
  }

  /* She WALKS between beats: face the direction, run the cycle, glide with
     the camera, then settle into the destination pose. */
  function goTo(n){
    if(transiting || n===bi) return;
    var from=BEATS[bi], b=BEATS[n];
    transiting=true; bi=n;
    copy.classList.remove('in'); pop.classList.remove('open');
    hotspot.style.display='none'; mood.innerHTML='';
    ['exitline','startpt'].forEach(function(id){document.getElementById(id).classList.remove('on');});
    facing = b.walk>=from.walk ? 1 : -1;
    setIdle(null);
    startStride();
    placeWalker(b.walk,b.gy);
    cam.setAttribute('transform','translate('+b.cam+',0)');
    later(function(){ arrive(b); }, 1250);
  }

  hotspot.addEventListener('click',function(){
    var d=BEATS[bi].data; if(!d) return;
    document.getElementById('popLbl').textContent=d.lbl;
    var f=document.getElementById('popFig');
    f.textContent=d.fig||''; f.style.display=d.fig?'block':'none';
    document.getElementById('popP').innerHTML=d.p;
    document.getElementById('popSrc').textContent=d.src;
    pop.classList.toggle('open');
  });
  document.getElementById('popX').onclick=function(){ pop.classList.remove('open'); };
  document.getElementById('next').onclick=function(){
    if(transiting) return;
    if(bi<2) goTo(bi+1); else window.__toCapture();
  };
  document.getElementById('prev').onclick=function(){ if(!transiting && bi>0) goTo(bi-1); };

  window.__startIntro=function(){
    clear(); transiting=false; bi=0;
    copy.classList.remove('in');
    cam.setAttribute('transform','translate(0,0)');
    arrive(BEATS[0]);
  };
})();
