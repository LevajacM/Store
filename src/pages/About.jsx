const About = () => {
  return (
    <>
      <div className='flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center'>
        <h1 className='text-4xl font-bold leading-none tracking-tight sm:text-6xl'>
          We love
        </h1>
        <div className='stats bg-primary shadow'>
          <div className='stat'>
            <div className='stat-title text-primary-content text-4xl font-bold tracking-widest'>
              comfy
            </div>
          </div>
        </div>
      </div>
      <p className='mt-6 text-lg leading-8 max-w-2xl mx-auto'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nihil,
        praesentium perferendis numquam eum porro iure necessitatibus quam
        voluptate sint? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Similique saepe aperiam quas ex odio libero.
      </p>
    </>
  );
};

export default About;
