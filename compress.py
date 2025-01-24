from io import BytesIO

from PIL import Image

Image.MAX_IMAGE_PIXELS = None


counter = 0

import os
for root, dirs, files in os.walk("../cse3000-research-project.github.io/content/posters", topdown=False):
    for name in files:
        if "poster" in name and "pdf" not in name and "PDF" not in name:
            counter += 1
            print(counter)
            pth = os.path.join(root, name)
            img = Image.open(pth)

            buffer = BytesIO()

            try:
                img.save(buffer, "JPEG", quality=5)
                print(pth)
                with open(pth, "wb") as handle:
                    handle.write(buffer.getbuffer())
            except:
                pass
